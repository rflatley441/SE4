import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import socket from './socket.js'

  const app = createApp(App);

  // Use plugins
  app.use(router);
  app.use(store);
  app.use(socket);
  
  app.mount('#app');