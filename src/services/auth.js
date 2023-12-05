import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth,db } from './firebase.js'
import { createUserProfile } from "./user.js"
import { doc, getDoc } from 'firebase/firestore'

let userData = {
    id: null,
    email: null,
    rol: null,
}
let observers = []

async function fetchUserProfile(userId) {
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
        const profile = await fetchUserProfile(user.uid);
  
        if(profile) {
            userData = {
                id: user.uid,
                email: user.email,
                rol: profile.rol, // ahora accedemos al rol desde la data del perfil
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            notifyAll();
        }
    } else {
        userData = {
            id: null,
            email: null,
            rol: null,
        };
        localStorage.removeItem('userData');
    }
})

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
        // Aquí limpia cualquier información del usuario que tengas en el estado.
        userData = {
            id: null,
            email: null,
            rol: null,
        };
        // Remueve el perfil del usuario del localStorage también.
        localStorage.removeItem('userData');
        // Notifica a todos los observadores que el usuario ha cerrado sesión.
        notifyAll();
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