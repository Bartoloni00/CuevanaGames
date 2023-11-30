import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { db } from "./firebase.js"
const refChat = collection(db, 'chat')

export function chatSaveMessage(data) 
{
    return addDoc(refChat, data)
}

export function chatSubscribeToMessage(callback)
{
    onSnapshot(refChat,snapshot=>{ // datos en tiempo real, trae los datos ordenados por su id por lo que para nosotros parecera que los trae desordenados
        const messages = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message 
            }
        })
        callback(messages)
    })
}