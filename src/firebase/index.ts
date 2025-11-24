import {getApps, initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAmfH8j2SvITUd7UGtCP_MEUW5z5xceXrs",
  authDomain: "voxyai1.firebaseapp.com",
  projectId: "voxyai1",
  storageBucket: "voxyai1.appspot.com",
  messagingSenderId: "205410049028",
  appId: "1:205410049028:web:2ccefceafd797101766951",
  measurementId: "G-NL5SSKSWDF"
};

export function initializeFirebase() {
  const apps = getApps();
  if (apps.length) {
    return {
      firebaseApp: apps[0],
      auth: getAuth(apps[0]),
      firestore: getFirestore(apps[0]),
    };
  }

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return {firebaseApp, auth, firestore};
}
