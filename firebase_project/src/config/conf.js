// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeGQ_-skqMtMYKcfRwt7x4uzfY6JqqAMw",
    authDomain: "fir-second-a495d.firebaseapp.com",
    projectId: "fir-second-a495d",
    storageBucket: "fir-second-a495d.appspot.com",
    messagingSenderId: "492985888076",
    appId: "1:492985888076:web:ff1b24884674aeeeb733e9",
    measurementId: "G-7JJP0TWELB"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()
export const  db=getFirestore(app)
export const storage=getStorage(app)
