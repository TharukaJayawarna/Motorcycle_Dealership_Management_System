import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCOnS3ZbFDPyOl9v-HvDEuar6tejL63rXk",
    authDomain: "promo-dc796.firebaseapp.com",
    projectId: "promo-dc796",
    storageBucket: "promo-dc796.appspot.com",
    messagingSenderId: "877158017960",
    appId: "1:877158017960:web:ac2a2fae7191e79cad8b9d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
