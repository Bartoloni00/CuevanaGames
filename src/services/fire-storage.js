import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase.js';

/**
 * @param {string} path
 * @param {File} file
 * @return {Promise}
 */
export async function uploadFile(path, file) {
  const storageRef = ref(storage, path);

  try {
    // Subir la imagen al Storage
    const snapshot = await uploadBytes(storageRef, file);

    // console.log('File uploaded successfully!', snapshot);

    // Devolver información adicional si es necesario
    return snapshot;
  } catch (error) {
    console.error('Error uploading file:', error.code, error.message);

    // Puedes manejar el error de manera específica o lanzarlo nuevamente para que sea manejado en otra parte del código
    throw error;
  }
}

/**
 * Retorna la URL del archivo almacenado
 * 
 * @param {string} path 
 * @returns {Promise<string>}
 */
export async function getFilesUrl(path){
    return getDownloadURL(ref(storage,path))
}