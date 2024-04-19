import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://127.0.0.1:5000";
const socket = io(URL);

export default socket;