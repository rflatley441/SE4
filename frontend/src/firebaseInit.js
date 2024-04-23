import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD6DibvBg5rAkpC4vi_Rc0O3wF59EA36Lc",
    authDomain: "qwirkle-dc485.firebaseapp.com",
    projectId: "qwirkle-dc485",
    storageBucket: "qwirkle-dc485.appspot.com",
    messagingSenderId: "287908889039",
    appId: "1:287908889039:web:00d9daec9adb93efcc92ba",
    measurementId: "G-NYRGBR77J2"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;