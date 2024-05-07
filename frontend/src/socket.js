import { reactive } from "vue";
import { io } from "socket.io-client";
import store from "./store";

export const state = reactive({
  connected: false,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://127.0.0.1:5000";

const socket = io(URL);

socket.on('message', function(message) {
  console.log('Received message:', message);
});

socket.on('connect', function() {
  state.connected = true;
});

socket.on('disconnect', function() {  
  state.connected = false;
});

socket.on('game-started', function(roomId) {
  console.log('Game started:', roomId);
  store.dispatch('gameStart', roomId);
});

export default socket;