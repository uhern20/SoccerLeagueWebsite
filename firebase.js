// firebase.js

// ------------------ Firebase Imports ------------------
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// ------------------ Firebase Config ------------------
const firebaseConfig = {
  apiKey: "AIzaSyDm4lGE5bvwjB0Kpue6hVheNuJgL1Ws13A",
  authDomain: "promosoccerleague-1e6f0.firebaseapp.com",
  projectId: "promosoccerleague-1e6f0",
  storageBucket: "promosoccerleague-1e6f0.firebasestorage.app",
  messagingSenderId: "43703842005",
  appId: "1:43703842005:web:0cabb35767d6b20e5a5e5c",
  measurementId: "G-T6YC5VZSTD"
};

// ------------------ Initialize Firebase ------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ------------------ DOM Ready ------------------
document.addEventListener("DOMContentLoaded", () => {

  // ------------------ SIGNUP ------------------
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const role = document.getElementById('signup-role').value;

      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store role in Firestore
        await setDoc(doc(db, "users", user.uid), { email, role });

        console.log("Registration successful!");
        // Redirect to success page
        window.location.href = "register-success.html";

      } catch (err) {
        console.error("Signup error:", err);
        alert("Signup Error: " + err.message);
      }
    });
  }

  // ------------------ LOGIN ------------------
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Retrieve role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const role = userDoc.data().role;
          console.log("Login successful! Role:", role);

          // Redirect based on role
          window.location.href = role === "admin" ? "admin-dashboard.html" : "player-dashboard.html";
        } else {
          alert("No role found for this user.");
        }

      } catch (err) {
        console.error("Login error:", err);
        alert("Login Error: " + err.message);
      }
    });
  }

});
