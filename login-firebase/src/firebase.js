import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyA5xGQdDpNZx2pEUJ7Zz7qJIXrhrGFS3IQ",
  authDomain: "auth-555.firebaseapp.com",
  databaseURL: "https://auth-555.firebaseio.com",
  projectId: "auth-555",
  storageBucket: "auth-555.appspot.com",
  messagingSenderId: "710409536824",
  appId: "1:710409536824:web:e078953ead5fafe3892dcd"
})

export const auth = app.auth()
export default app
