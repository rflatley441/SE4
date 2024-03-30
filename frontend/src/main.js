import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import { initializeApp } from 'firebase/app';
import VueScoketIO from 'vue-3-socket.io'


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


  const app = createApp(App)
  
  app.use(new VueScoketIO({
      debug: true,
      connection: 'http://localhost:8080', 
      vuex: {
          store,
          actionPrefix: 'SOCKET_',
          mutationPrefix: 'SOCKET_'
      },
  }))   
  // Use plugins
  app.use(router);
  app.use(store);
  
  // Mount the application
  app.mount('#app');