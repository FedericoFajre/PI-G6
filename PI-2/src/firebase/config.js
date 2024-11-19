import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCJ5XOhT1yKvXf-unUAzD7vf0NH5nuGZ7M",
    authDomain: "pi-g6-2cb87.firebaseapp.com",
    projectId: "pi-g6-2cb87",
    storageBucket: "pi-g6-2cb87.firebasestorage.app",
    messagingSenderId: "297825774017",
    appId: "1:297825774017:web:0f01970b005c12c3d22740"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
