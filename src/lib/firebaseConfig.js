// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHPHTwiPHkDJ9nW-SX2nzDADFe1EN_Qsc",
  authDomain: "kustomai.firebaseapp.com",
  projectId: "kustomai",
  storageBucket: "kustomai.firebasestorage.app",
  messagingSenderId: "557725739077",
  appId: "1:557725739077:web:45a9e0e4d3ef18c9a85b2c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app)
export {auth};
export default app