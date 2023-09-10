import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsq76Jm6v0Zw6OvVjVu2W810_e1fwmNIM",
  authDomain: "curso-a73c0.firebaseapp.com",
  projectId: "curso-a73c0",
  storageBucket: "curso-a73c0.appspot.com",
  messagingSenderId: "324031824851",
  appId: "1:324031824851:web:c379f5aa8d61fdbcdc2526",
  measurementId: "G-6CBMNNNKCG",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
