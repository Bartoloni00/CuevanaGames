import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase.js"
const refChat = collection(db, 'chat')

export function chatSaveMessage(data) 
{
    return addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),// Agrega la fecha y hora del mensaje esto lo hacemos para poder ordenar los mensajes
    })
}

export function chatSubscribeToMessage(callback)
{
    // creamos un query para poder filtrar los datos/traerlos en un orden especifico
    const q = query(refChat, orderBy('created_at'))
    onSnapshot(refChat,snapshot=>{ // datos en tiempo real, trae los datos ordenados por su id por lo que para nosotros parecera que los trae desordenados
        const messages = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message,
                created_at: doc.data().created_at,
            }
        })
        callback(messages)
    })
}