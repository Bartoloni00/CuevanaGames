import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from './firebase.js'

let userData = {
    id: null,
    email: null,
}
let observers = []
/**
 * 
 * @param {{email:string,password:string}} param0 
 * @returns {Promise}
 */
export function login({email,password}) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            userData = {
                id: userCredentials.user.uid,
                email: userCredentials.user.email,
            }
            notifyAll();
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

/**
 * Agrega el observer para ser notificados de los datos
 * @param {({})=>void} callback 
 */
export function subscribeToAuth(observer) {
    observers.push(observer)

    notify(observer)
}  

function notify(callback) {
    callback({
        ...userData,
    })
}

function notifyAll() {
    observers.forEach(observer => notify(observer))
}