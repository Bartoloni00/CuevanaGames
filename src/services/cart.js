/*
Estructura del carrito
[C]carts {
    [D]userId: {
        [F]status: "activo",
        [C]items: {
            [D]itemId {
                [F]title: "Nombre del Juego",
                [F]price: 19.99,
                [F]CoverURL: "url",
                [F]CoverText: "alt",
            }
            // ... Otros ítems del carrito
        }
    }
}
*/
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

const cartRef = collection(db, 'carts')

/**
 * Trae el carrito que le pertenece a ese usuario.
 * Si el usuario no tiene un carrito lo crea.
 * @param {String} userId 
 */
export async function getCart(userId) {
    try {
        if (!userId) throw new Error('El ID de usuario no está definido o es inválido');

        const cartQuery = query(cartRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(cartQuery);

        if (!querySnapshot.empty) {
            const cartDoc = querySnapshot.docs[0]; // Tomar el primer documento de la consulta
            return {
                id: cartDoc.id,
                status: cartDoc.data().status,
            };
        } else {
            await createCart(userId);

            // Volver a intentar obtener el carrito después de la creación
            const newCartQuery = query(cartRef, where("userId", "==", userId));
            const newQuerySnapshot = await getDocs(newCartQuery);

            if (!newQuerySnapshot.empty) {
                const newCartDoc = newQuerySnapshot.docs[0];
                return {
                    id: newCartDoc.id,
                    status: newCartDoc.data().status,
                };
            } else {
                throw new Error('Error al intentar obtener el carrito después de la creación');
            }
        }
    } catch (error) {
        throw new Error('Ocurrió un error inesperado al obtener o crear el carrito de compras', error);
    }
}

/**
 * Crea el carrito del usuario
 * @param {String} UserId 
 */
async function createCart(UserId){
    try {
        console.log('antes de crear el carrito');
        const cartDoc = await addDoc(cartRef,{
            userId: UserId,
            status: 'active',
        })
        console.log('despues de crear el carrito', cartDoc);
        return cartDoc
    } catch (error) {
        console.log(error);
        throw new Error({message: 'Ocurrio un error al crear el carrito'})
    }
}

/**
 * Agrega un producto/juego al carrito del usuario
 * @param {String} userId 
 * @param {{gameId: String, title: String, price: Number, photoURL: String}} itemData 
 */
export async function addItemToCard(userId,{gameId,title, price, photoURL}){
    const cartDoc = await getCart(userId)
    const itemsRef = collection(db, `carts/${cartDoc.id}/items`)

    // Verificar si ya existe un juego con el mismo gameId
    const existingItemQuery = query(itemsRef, where("gameId", "==", gameId));
    const existingItemSnapshot = await getDocs(existingItemQuery);

    if (!existingItemSnapshot.empty) {
        // Si ya existe, puedes manejar la situación como desees.
        // Por ejemplo, lanzar un error, actualizar el juego existente, etc.
        throw new Error("Este juego ya se encuentra en el carrito.");
    }

    await addDoc(itemsRef,{
        gameId, gameId,
        title: title,
        price: price,
        photoURL: photoURL,
        add_at: serverTimestamp(),
    })
}
/**
 * Trae un array de los items que posee el carrito
 * @param {String} userId 
 * @param {()=>{}} callback 
 * @returns 
 */
export async function getItemsFromCart(userId, callback){
    const cartDoc = await getCart(userId)

    const q = query(
        collection(db, `carts/${cartDoc.id}/items`), 
        orderBy('add_at')
        )
    return onSnapshot(q, snapshot => {
        const docs  = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                gameId:  doc.data().gameId,
                title: doc.data().title,
                price: doc.data().price,
                photoURL: doc.data().photoURL,
                add_at: doc.data().add_at?.toDate()
            }
        })
        callback(docs)
    })
}