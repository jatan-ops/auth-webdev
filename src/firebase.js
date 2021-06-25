import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDSkFtie9QVoJ-X5oUweaASOD-Bna4BkYM",
  authDomain: "auth-development-d476b.firebaseapp.com",
  projectId: "auth-development-d476b",
  storageBucket: "auth-development-d476b.appspot.com",
  messagingSenderId: "393700406264",
  appId: "1:393700406264:web:dabbf1031f3c57367b5c0d",
});

export const auth = app.auth();
export default app;
