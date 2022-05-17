import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACuJd_plne9pWvgluSj_k3wQLZGIcgjDw",
  authDomain: "zeusapi-246c0.firebaseapp.com",
  projectId: "zeusapi-246c0",
  storageBucket: "zeusapi-246c0.appspot.com",
  messagingSenderId: "279209489466",
  appId: "1:279209489466:web:6e3cd629add5cdaefa3103",
  measurementId: "G-XESY9LEXBY"
};


const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
