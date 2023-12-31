import { db } from "./firebase";
import { doc, getDoc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore";

/**
 *
 * @param {string} id
 * @returns {{id: string|null, email: string|null, displayName: string|null, level: Number, photoURL: string|null}}
 */
export async function getUserById(id) {
  const snapshot = await getDoc(doc(db, `/users/${id}`));
  return {
    id,
    email: snapshot.data().email,
    displayName: snapshot.data().displayName,
    rol: snapshot.data().rol,
    level: snapshot.data().level,
    photoURL: snapshot.data().photoURL,
  };
}

/**
 * Retrieves all users from the Firestore database.
 * @returns {Promise<Array<{id: string, email: string}>>}
 */
export async function getAllUsers() {
  const usersRef = collection(db, "users");
  const snapshot = await getDocs(usersRef);
  const usersList = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return usersList;
}

/**
 * Crea un perfil de usuario
 * @param {string} id
 * @param {{}} data
 */
export async function createUserProfile(id, data) {
  // Firestore organiza sus documentos y collecciones en formato URL.
  const userRef = doc(db, `/users/${id}`);
  return setDoc(userRef, data);
}

/**
 * 
 * @param {string} id
 * @param {{displayName: string|null, level: Number|null}} data 
 * @return {Promise}
 */
export async function editUserProfile(id, data){
  return updateDoc(
    doc(db, `/users/${id}`),
    data
  )
}