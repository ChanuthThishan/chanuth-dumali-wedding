import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ---------------------------
   FIREBASE CONFIG
----------------------------*/
const firebaseConfig = {
  apiKey: "AIzaSyDFj1Ppb-2iJHlc6kR-RV5FaW3--Zwwb-o",
  authDomain: "chanuth-dumali-wedding.firebaseapp.com",
  projectId: "chanuth-dumali-wedding",
  storageBucket: "chanuth-dumali-wedding.firebasestorage.app",
  messagingSenderId: "240243255855",
  appId: "1:240243255855:web:31a8c90ac39389201f74da"
};

/* ---------------------------
   INIT FIREBASE
----------------------------*/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ---------------------------
   SAVE RSVP FUNCTION
----------------------------*/
export async function saveRSVP(data) {
  try {
    await addDoc(collection(db, "rsvps"), data);
    console.log("RSVP saved successfully!");
    return true;
  } catch (error) {
    console.error("Firebase error: ", error);
    return false;
  }
}