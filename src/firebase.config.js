import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyDBBjSOfUvyPD1WwWv5SpQiroi8Lc2jcQw",
  authDomain: "recipe-3606b.firebaseapp.com",
  projectId: "recipe-3606b",
  storageBucket: "recipe-3606b.firebasestorage.app",
  messagingSenderId: "419931007824",
  appId: "1:419931007824:web:406594d581567188489a55"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;