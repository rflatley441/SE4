import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.apiKey}`,
  authDomain: `${process.env.authDomain}`,
  projectId: "qwirkle-dc485",
  storageBucket: "qwirkle-dc485.appspot.com",
  messagingSenderId: "287908889039",
  appId: "1:287908889039:web:00d9daec9adb93efcc92ba",
  measurementId: "G-NYRGBR77J2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(firebaseApp, "gs://qwirkle-dc485.appspot.com");