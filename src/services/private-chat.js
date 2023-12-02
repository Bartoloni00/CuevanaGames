/*
Estructura para manejar los chatPrivados:
[C] private-chat {
    [D] idAuto {
        Users: {
            IdUser1: true,
            IdUser2: true,
        },
        [C] messages {
            [D] idAuth {
                userId: idUser1,
                message:...,
                created_at: Timestamp,
            },
            ...
        }
    }
}
Cada documento sera un chatPrivado que guarda sus integrantes y todos los mensajes
*/
import { addDoc, collection, serverTimestamp, doc } from 'firebase/firestore'
import {db} from './firebase'

export async function sendPrivateMessage({sender, receiver, message}) {
    const document = await addDoc(collection(db, 'private-chats'), {
        users: {
            [sender]: true,
            [receiver]: true,
        }
    })
    const messagesRef = collection(db,`private-chats/${document.id}/messages`)
    const response = await addDoc(messagesRef, {
        userId: sender,
        message,
        created_at: serverTimestamp(),
    })
    return {
        id: response.id,
    }
}