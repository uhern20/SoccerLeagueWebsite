// ------------------ Firebase Imports ------------------
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// ------------------ Firebase Config ------------------
const firebaseConfig = {
  apiKey: "AIzaSyDm4lGE5bvwjB0Kpue6hVheNuJgL1Ws13A",
  authDomain: "promosoccerleague-1e6f0.firebaseapp.com",
  projectId: "promosoccerleague-1e6f0",
  storageBucket: "promosoccerleague-1e6f0.appspot.com",
  messagingSenderId: "43703842005",
  appId: "1:43703842005:web:0cabb35767d6b20e5a5e5c",
  measurementId: "G-T6YC5VZSTD"
};

// ------------------ Initialize Firebase ------------------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// ------------------ Export Firebase Objects ------------------
export { db, storage, auth };
