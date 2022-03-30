import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCq7DAWk5KFe0f2kg92ShqTxGkn64VDioo",
    authDomain: "topmind-eedd5.firebaseapp.com",
    projectId: "topmind-eedd5",
    storageBucket: "topmind-eedd5.appspot.com",
    messagingSenderId: "1093346272867",
    appId: "1:1093346272867:web:8602d27c712b095eb1fa56",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
