// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3ptbyR2bW5bZKxVxnHNj9rsVa9wb2KFA",
  authDomain: "hotel-management-system-a5438.firebaseapp.com",
  projectId: "hotel-management-system-a5438",
  storageBucket: "hotel-management-system-a5438.appspot.com",
  messagingSenderId: "237728175206",
  appId: "1:237728175206:web:6e34706036924d3e1809a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
