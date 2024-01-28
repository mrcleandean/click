import { initializeApp } from "firebase/app";
import { getAuthentication } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBROXLqsofhVWChEb9sOi-Zw_IfrPP47MU",
    authDomain: "click-37767.firebaseapp.com",
    projectId: "click-37767",
    storageBucket: "click-37767.appspot.com",
    messagingSenderId: "1080254672360",
    appId: "1:1080254672360:web:43fe5aca9529670b40885d",
    measurementId: "G-8M10YT10YN"
};

// Initialize Firebase
export const APP = initializeApp(firebaseConfig);
export const AUTH = getAuthentication(APP);
export const DB = getFirestore(APP);
