import { reactive } from "vue";
import { io } from "socket.io-client";
import {getAuth, onAuthStateChanged} from "firebase/auth";


const production = "wss://intro-se-sockets-lab-server.fly.dev";

const development = "ws://localhost:8080"

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:8080";

export const socket = io(URL);


socket.on("connect", () => {
  state.connected = true;
  console.log("connected");
    
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // user is signed in
      const uid = user.uid;
      console.log("User is signed in.", uid);
    } else {
      // user is signed out 
      console.log("No user is signed in.");
    }
  }); 
});

socket.on("disconnect", () => {
  state.connected = false;
});

// socket.on("foo", (...args) => {
//   state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });