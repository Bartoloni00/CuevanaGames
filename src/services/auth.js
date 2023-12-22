import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { auth,db } from './firebase.js'
import { createUserProfile, editUserProfile } from "./user.js"
import { doc, getDoc } from 'firebase/firestore'
import {getFilesUrl, uploadFile} from './fire-storage.js'

let userData = {
    id: null,
    email: null,
    rol: null,
    displayName: null,
    photoURL: null,
    level: null,
    fullProfileLoaded: false,
}
let observers = []

if (localStorage.getItem('userData')) {
    updateUserData(JSON.parse(localStorage.getItem('userData')))
}

export async function fetchUserProfile(userId) {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No user profile found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user profile: ", error);
        return null;
    }
}
// recordamos en localstorage que el usuario esta authenticado.
// Esto ahorra tiempo ya que verificamos antes de que firebase nos lo diga.
if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'))
}

onAuthStateChanged(auth, async user => {
    if (user) {
        updateUserData({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })


        const profile = await fetchUserProfile(user.uid);

        updateUserData({
            ...userData,
            rol: profile.rol,
            level: profile.level,
            fullProfileLoaded: true
        })
    } else {
        updateUserData({
            id: null,
            email: null,
            rol: null,
            displayName: null,
        })
    }
})

/**
 * 
 * @param {{displayName || string|null}} data 
 * @return {Promise}
 */
export async function editUser({displayName, level, photoURL}){
    try {
        const data = {}
        if (displayName != null) data.displayName = displayName
        if (photoURL != null) data.photoURL = photoURL

        // Actualizamos los datos en Auth
        const promiseAuth = updateProfile(auth.currentUser, data)
        // Preparamos los datos para firestore
        if (level != null) data.level = level
        // Actualizamos los datos en DB
        const promiseProfile = editUserProfile(userData.id,data)

        updateUserData(data)
        // Promise.all : esto sirve para utilizar varias promesas en paralelo que no se ven afectadas entre si
        return Promise.all([promiseAuth, promiseProfile]) 
    } catch (error) {
        throw error
    }
}

/**
 * 
 * @param {file} file 
 * @returns {Promise}
 */
export async function editUserImage(file) {
    const filePath = `users/${userData.id}/avatar`
    await uploadFile(filePath, file)

    // Pedimos la URL que le corresponde
    const photoURL = await getFilesUrl(filePath)

    return editUser({
        photoURL,
    })
}

export async function register({email,password}) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        
        createUserProfile(userCredentials.user.uid,{
            email,
            rol: 'client'
        })

        return {...userData}
    } catch (error) {
        return {
            code: error.code,
            message: error.message
        }
    }
}

/**
 * 
 * @param {{email:string,password:string}} param0 
 * @returns {Promise}
 */
export function login({email,password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            return userData;
        })
        .catch(error => {
            const output = {
                message: error.message,
                code: error.code,
            }
            console.error("[auth.js login] Error al autenticar: ", output);
            return output;
        });
}

export function logout() {
    return signOut(auth).then(() => {
        clearUserData()
        console.log("Usuario ha cerrado sesión exitosamente.");
    }).catch(error => {
        // Aquí manejas el caso de un error al intentar cerrar la sesión.
        console.error("Error al cerrar sesión: ", error);
    });
}

/**
 * Agrega el observer para ser notificados de los datos
 * @param {({})=>void} callback 
 * @returns {()=>void} Funcion para cancelar subscripcion
 */
export function subscribeToAuth(observer) {
    observers.push(observer)
    // console.log('Observer agregado', observers);
    notify(observer)

    // cancelamos la subscripcion de los que ya no utilizaremos
    return () => observers = observers.filter(obs => obs !== observer)
}  

function notify(callback) {
    callback({
        ...userData,
    })
}

function notifyAll() {
    observers.forEach(observer => notify(observer))
}

/**
 * Actualiza los datos del usuario agregando los que se proveen por parametro.
 * Una vez actualizados se guardan en localstorage y se notifica de esto a los observers
 * @param {id: string|null, email: string|null, displayName: string|null, rol:string|null, level: number|null, fullProfileLoaded: boolean} newData 
 */
function updateUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }
    localStorage.setItem('userData',JSON.stringify(userData))
    notifyAll()
}

/**
 * Aquí limpia cualquier información del usuario que tengas en el estado.
 * Remueve el perfil del usuario del localStorage también.
 * Notifica a todos los observadores que el usuario ha cerrado sesión.
 */
function clearUserData(){
    userData = {
        id: null,
        email: null,
        rol: null,
        displayName: null,
        level: null,
        photoURL: null,
        fullProfileLoaded: false,
    };
    localStorage.removeItem('userData');
    notifyAll();
}