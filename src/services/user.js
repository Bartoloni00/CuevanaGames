import {db} from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

/**
 * 
 * @param {string} id 
 * @returns {{id: string, email: string}}
 */
export async function getUserById(id){
    const snapshot = getDoc(doc(db, `/users/${id}`))
    return {
        id,
        email: (await snapshot).data().email,
    }
}

/**
 * Crea un perfil de usuario
 * @param {string} id 
 * @param {{}} data 
 */
export async function createUserProfile(id, data) {
    // Firestore organiza sus documentos y collecciones en formato URL.
    const userRef = doc(db,`/users/${id}`)
    return setDoc(userRef, data)
}