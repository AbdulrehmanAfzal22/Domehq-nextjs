// /lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9I7B8Y8ufi2v-4X9KPEHzgZl2VjWVJ6M",
  authDomain: "domehq-nextjs.firebaseapp.com",
  projectId: "domehq-nextjs",
  storageBucket: "domehq-nextjs.firebasestorage.app",
  messagingSenderId: "591897235410",
  appId: "1:591897235410:web:796c491ce308238d30020b",
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);



