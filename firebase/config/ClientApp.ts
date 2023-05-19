import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBCx4KYG3yX55WzCvlKr_YhctfGFK4xddI",
    authDomain: "cryptocurrencies-3b723.firebaseapp.com",
    projectId: "cryptocurrencies-3b723",
    storageBucket: "cryptocurrencies-3b723.appspot.com",
    messagingSenderId: "548210707437",
    appId: "1:548210707437:web:c416ae054f27ac2102b5e4",
    measurementId: "G-FHLNF29BJW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth(app);