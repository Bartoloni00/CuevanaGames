// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firestore-app.js"; NO TRAE LOS DATOS EN TIEMPO REAL
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI9hjJZahcrclS2tMo30VFzfcXq1Zmw0c",
  authDomain: "cuevana-games.firebaseapp.com",
  projectId: "cuevana-games",
  storageBucket: "cuevana-games.appspot.com",
  messagingSenderId: "77138330005",
  appId: "1:77138330005:web:4edd67ba199a298ae4369c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
