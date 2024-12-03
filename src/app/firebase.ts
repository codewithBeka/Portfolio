import { initializeApp } from "firebase/app";
import { getMessaging, isSupported, getToken, onMessage, Messaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2CWmxcf4mpWqrpvhCwrcaWROqSry8VDo",
  authDomain: "zenbile-gebya.firebaseapp.com",
  projectId: "zenbile-gebya",
  storageBucket: "zenbile-gebya.appspot.com",
  messagingSenderId: "981863023028",
  appId: "1:981863023028:web:71786b891ed77d244c32e1",
  measurementId: "G-FMKLB2EWG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variable for messaging, declared with type
let messaging: Messaging | undefined; // Use Messaging type

// Check if messaging is supported
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    } else {
      console.error("Firebase Messaging is not supported in this browser.");
    }
  });
}

export { messaging, getToken, onMessage, db };