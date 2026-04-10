import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsfJTu0eZ7SFfYVAwq9dUkYIldWpULpY0",
  authDomain: "mywebsite-c2d4a.firebaseapp.com",
  databaseURL: "https://mywebsite-c2d4a-default-rtdb.firebaseio.com",
  projectId: "mywebsite-c2d4a",
  storageBucket: "mywebsite-c2d4a.firebasestorage.app",
  messagingSenderId: "704008587532",
  appId: "1:704008587532:web:b22ab2e6b9574a9e42a129",
  measurementId: "G-6R2WFHJLP7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default app;
