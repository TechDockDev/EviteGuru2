import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDjJ78J9xORnZrnCfo8djq6wNEZEKKxC0",
    authDomain: "sing-in-fb2cb.firebaseapp.com",
    projectId: "sing-in-fb2cb",
    storageBucket: "sing-in-fb2cb.appspot.com",
    messagingSenderId: "212772386552",
    appId: "1:212772386552:web:a37309e2a81172c8e12d0d"
};

const app = initializeApp(firebaseConfig);
export const Authentication = getAuth(app)