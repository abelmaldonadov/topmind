import firebase from "firebase"
import "firebase/firestore"

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
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default {
    firebase,
    db,
}
