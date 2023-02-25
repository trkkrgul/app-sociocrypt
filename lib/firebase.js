import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyqezhf3bgQieeRy_J-tzyX19fLH_uNJY",
  authDomain: "socio-378818.firebaseapp.com",
  projectId: "socio-378818",
  storageBucket: "socio-378818.appspot.com",
  messagingSenderId: "713031518933",
  appId: "1:713031518933:web:31cbb037958e251bfdf05c",
  measurementId: "G-7KLJ38K8ES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
