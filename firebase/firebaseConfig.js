// Import only what you need (tree-shaking support)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Firebase config — keep this secret
const firebaseConfig = {
  apiKey: "AIzaSyBgyJ_qxeMLvsSVCJRfLmxjmTJ5YZbqZbE",
  authDomain: "jamiichama-app.firebaseapp.com",
  projectId: "jamiichama-app",
  storageBucket: "jamiichama-app.appspot.com",
  messagingSenderId: "789180868846",
  appId: "1:789180868846:android:ec3beb3f1c266001f1abff"
};

// ✅ Initialize Firebase only ONCE
const app = initializeApp(firebaseConfig);

// ✅ Export reusable Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // Firestore (optional if using)

export { app, auth, db };
