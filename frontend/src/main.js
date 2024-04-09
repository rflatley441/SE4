import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import { initializeApp } from 'firebase/app';
import socket from './socket.js'


const firebaseConfig = {
    apiKey: "AIzaSyD6DibvBg5rAkpC4vi_Rc0O3wF59EA36Lc",
    authDomain: "qwirkle-dc485.firebaseapp.com",
    projectId: "qwirkle-dc485",
    storageBucket: "qwirkle-dc485.appspot.com",
    messagingSenderId: "287908889039",
    appId: "1:287908889039:web:00d9daec9adb93efcc92ba",
    measurementId: "G-NYRGBR77J2"
  };

  initializeApp(firebaseConfig);

  const app = createApp(App);
  // Use plugins
  app.use(socket);
  app.use(router);
  app.use(store);
  
  // Mount the application
  app.mount('#app');