import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyLdNmCrHrytGQCT1XpxYhRxT2FtkWnX4",
  authDomain: "entertainment-db-6272f.firebaseapp.com",
  projectId: "entertainment-db-6272f",
  storageBucket: "entertainment-db-6272f.appspot.com",
  messagingSenderId: "1002820399266",
  appId: "1:1002820399266:web:e6df22ee45891dc6ae67fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
