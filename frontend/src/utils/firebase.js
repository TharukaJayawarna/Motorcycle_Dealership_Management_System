import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvr3zvyy8cr_PRT0lO0MaGKyKiFUfzr24",
  authDomain: "user-profile-4ffed.firebaseapp.com",
  projectId: "user-profile-4ffed",
  storageBucket: "user-profile-4ffed.appspot.com",
  messagingSenderId: "188540444659",
  appId: "1:188540444659:web:b6dae07dd72bde567c7c86"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

