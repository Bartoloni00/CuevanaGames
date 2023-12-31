import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, getDocs, where } from "firebase/firestore"
// import { db, query, where, getDocs } from 'firebase/firestore';
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
    return onSnapshot(refChat,snapshot=>{ // datos en tiempo real, trae los datos ordenados por su id por lo que para nosotros parecera que los trae desordenados
        const messages = snapshot.docs.map(doc => {
            return {
                user: doc.data().user,
                message: doc.data().message,
                userId: doc.data().userId,
                created_at: doc.data().created_at?.toDate(),
            }
        })
        callback(messages)
    })
}


export async function getPrivateChatsForUser(userId, callback) {
    const q = query(
        collection(db, 'private-chats'),
        where(`users.${userId}`, '==', true)
    );

    const querySnapshot = await getDocs(q);
    const userIds = [];

    querySnapshot.forEach((doc) => {
        const users = doc.data().Users;
        Object.keys(users).forEach((key) => {
            if (key !== userId && !userIds.includes(key)) {
                userIds.push(key);
            }
        });
    });

    callback(userIds);
}
