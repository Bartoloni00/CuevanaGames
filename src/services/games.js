import { collection, addDoc, getDocs } from 'firebase/firestore';
import {db} from './firebase'
const gamesRef = collection(db, 'games'); // Referencia a la colección "games"

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
        }));
        return games;
    } catch (e) {
        console.error('Error fetching games:', e);
        throw new Error('Error al obtener la lista de juegos');
    }
}
