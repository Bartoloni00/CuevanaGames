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
import { addDoc, collection, serverTimestamp, getDocs, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import {db} from './firebase'

// Guardamos los documententos de los chats privados
const chatDocsCache = []

/**
 * 
 * @param {{user1: string, user2: string}} data 
 * @param {()=>{}} callback 
 * @returns {Promise<import("firebase/auth").Unsubscribe }
 */
export async function subscribeToPrivateChat({user1, user2}, callback){
    const chatDoc = await getPrivateChatDocument({user1, user2})

    const q = query(
        collection(db, `private-chats/${chatDoc.id}/messages`), 
        orderBy('created_at')
        )
    return onSnapshot(q, snapshot => {
        const docs  = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                userId:  doc.data().userId,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate()
            }
        })
        callback(docs)
    })
}

/**
 * 
 * @param {sender: string, receiver: string, message: string} param0 
 * @returns {Promise}
 */
export async function sendPrivateMessage({sender, receiver, message}) {
    const document = await getPrivateChatDocument({user1: sender, user2: receiver})
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

/**
 * Busca si ya existe un chat entre esos dos usuarios y lo devuelve
 * en caso contrario crea uno
 * @param {{user1: string, user2: string}} data 
 * @returns {Promise}
 */
async function getPrivateChatDocument({user1, user2}){
    const doc = getFromDocsCache({user1, user2})// busca el chat en cache
    if (doc) return doc // si existe lo retorna

    const users = {
        [user1]: true,
        [user2]: true,
    }
    const chatRef = collection(db, 'private-chats')
    const q = query(chatRef, where('users', '==', users))
    const snapshot = await getDocs(q)

    let chatDoc = null
    if(snapshot.empty) {
        chatDoc = await createPrivateChatDocument({user1: user1, user2: user2})
    } else {
        chatDoc = snapshot.docs[0]
    }
    addToDocsCache({user1, user2}, chatDoc) // agrego el chat a cache
    return  chatDoc
}

/**
 * Crea un chat entre dos usuarios
 * @param {{user1: string, user2: string}} param0 
 * @returns {Promise}
 */
async function createPrivateChatDocument({user1, user2}){
    return addDoc(collection(db, 'private-chats'), {
        users: {
            [user1]: true,
            [user2]: true,
        }
    })
}

/**
 * Tiene los mensajes guardados en cache
 * @param {*} param0 
 * @returns 
 */
function getFromDocsCache({user1, user2}){
    const key = getDocsCacheKey({user1, user2})
    return chatDocsCache[key] || null
} 

/**
 * guarda los mensajes en la variable chatDocsCache
 * @param {*} param0 
 * @param {*} doc 
 */
function addToDocsCache({user1, user2}, doc){
    const key = getDocsCacheKey({user1, user2})
    chatDocsCache[key] = doc
}

function getDocsCacheKey({user1,user2}) {
    return user1 > user2 ? 
    user1 + user2:
    user2 + user1;
}