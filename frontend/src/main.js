import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import VueScoketIO from 'vue-3-socket.io'

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

app.use(router)
app.use(store)
app.mount('#app')