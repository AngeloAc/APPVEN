// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9hvnvoHFd_TMajsM9MUwavXqolg9OILc",
  authDomain: "starticaiao.firebaseapp.com",
  projectId: "starticaiao",
  storageBucket: "starticaiao.appspot.com",
  messagingSenderId: "811651267444",
  appId: "1:811651267444:web:3c0acf073c671ef1de0a21",
  measurementId: "G-EY72JE8L11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getStorage }  from 'firebase/storage';
const storage = getStorage(app)

export { storage }
