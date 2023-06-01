import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDwDjva0PK2_EhNa6T2aXVqcA6ny51fLCY",
    authDomain: "eviteguru.firebaseapp.com",
    projectId: "eviteguru",
    storageBucket: "eviteguru.appspot.com",
    messagingSenderId: "199852310825",
    appId: "1:199852310825:web:253f3d2d4b59a08a47f738"
  };

const app = initializeApp(firebaseConfig);
export const Authentication = getAuth(app)