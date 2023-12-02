import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from './firebase.js'
import { serverTimestamp } from "firebase/firestore"

let userData = {
    id: null,
    email: null,
}
let observers = []

// recordamos en localstorage que el usuario esta authenticado.
// Esto ahorra tiempo ya que verificamos antes de que firebase nos lo diga.
if (localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'))
}

onAuthStateChanged(auth, user => {
    if (user) {
        userData = {
            id: user.uid,
            email: user.email,
        }
        localStorage.setItem('userData', JSON.stringify(userData))
    } else {
        userData = {
            id: null,
            email: null,
        }
    }
    localStorage.removeItem('userData')
    notifyAll()
})

export function register({email,password}) {
    return createUserWithEmailAndPassword(auth, email, password)
            .then(()=>{
                return {...userData}
            }) 
            .catch(error=>{
                return {
                    code: error.code,
                    message: error.message
                }
            })
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

export function logout(){
    return signOut(auth)
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