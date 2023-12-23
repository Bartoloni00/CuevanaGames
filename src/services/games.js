import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import {getFilesUrl, uploadFile} from './fire-storage.js'
import {db} from './firebase'
const gamesRef = collection(db, 'games')

export async function createGame({ title, description, price }) {
    // Verifica si los campos obligatorios están definidos
    if (!title || !description || !price) {
        throw new Error("Los campos title, description y price son obligatorios");
    }

    // Agrega el documento a la colección "games" con los datos proporcionados
    try {
        const gameDocRef = await addDoc(gamesRef, {
            title: title,
            description: description,
            price: price
        });
        return gameDocRef.id; // Devuelve el ID del documento recién creado
    } catch (e) {
        throw new Error("Error al añadir el juego");
    }
}

export async function getAllGames() {
    try {
        const querySnapshot = await getDocs(gamesRef);
        const games = querySnapshot.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            price: doc.data().price,
            photoURL: doc.data().photoURL,
        }));
        return games;
    } catch (e) {
        console.error('Error fetching games:', e);
        throw new Error('Error al obtener la lista de juegos');
    }
}

export async function getGameById(gameId) {
    try {
        const gameDoc = await getDoc(doc(gamesRef, gameId));

        if (gameDoc.exists()) {
            return {
                id: gameDoc.id,
                title: gameDoc.data().title,
                description: gameDoc.data().description,
                price: gameDoc.data().price,
                photoURL: gameDoc.data().photoURL,
            };
        } else {
            throw new Error(`No se encontró ningún juego con el ID: ${gameId}`);
        }
    } catch (e) {
        console.error(`Error fetching game with ID ${gameId}:`, e);
        throw new Error(`Error al obtener el juego con ID ${gameId}`);
    }
}

export async function deleteGameById(gameId) {
    try {
        await deleteDoc(doc(gamesRef, gameId));
        console.log(`Juego con ID ${gameId} eliminado correctamente.`);
    } catch (e) {
        console.error(`Error deleting game with ID ${gameId}:`, e);
        throw new Error(`Error al eliminar el juego con ID ${gameId}`);
    }
}

export async function updateGameById(gameId, { title, description, price, file }) {
    try {
        // referencio el documento del juego
        const gameRef = doc(gamesRef, gameId);

        if (file != null) {
            // Cargo la imagen y retorno la url:
            const photoURL = await editGameImage(gameId, file)
            console.log('updateGameById', photoURL);
            // actualizo el documento
            await updateDoc(gameRef, {
                title: title,
                description: description,
                price: price,
                photoURL: photoURL,
            });
            return
        }

        // actualizo el documento
        await updateDoc(gameRef, {
            title: title,
            description: description,
            price: price,
        });
        // console.log(`Juego con ID ${gameId} actualizado correctamente.`);
    } catch (e) {
        console.error(`Error updating game with ID ${gameId}:`, e);
        throw new Error(`Error al actualizar el juego con ID ${gameId}`);
    }
}

/**
 * 
 * @param {file} file 
 * @returns {Promise}
 */
async function editGameImage(gameId, file) {
    const filePath = `games/${gameId}/frontPage`
    await uploadFile(filePath, file)

    // Pedimos la URL que le corresponde
    const photoURL = await getFilesUrl(filePath)

    return  photoURL
}