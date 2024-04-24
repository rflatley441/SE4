import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  user: null,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://127.0.0.1:5000";
const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
  console.log("Socket connected");
  
  // if (state.user) {
  //   socket.emit("userConnected", state.user);
  // }
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log("Socket disconnected");
});

// socket.on("userConnected", (message) => {
//   console.log("User connected: ", message);
// });

// socket.on("userConnected", (user) => {
//   console.log("User connected: ", user);
// });

export default socket;