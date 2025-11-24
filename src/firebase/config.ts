// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmfH8j2SvITUd7UGtCP_MEUW5z5xceXrs",
  authDomain: "voxyai1.firebaseapp.com",
  projectId: "voxyai1",
  storageBucket: "voxyai1.appspot.com",
  messagingSenderId: "205410049028",
  appId: "1:205410049028:web:2ccefceafd797101766951",
  measurementId: "G-NL5SSKSWDF"
};

// Initialize Firebase
function initializeFirebase() {
    if (getApps().length > 0) {
        return getApps()[0];
    }
    return initializeApp(firebaseConfig);
}

export const firebaseApp = initializeFirebase();
