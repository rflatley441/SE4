<template>
  <!-- <router-view/> -->
  {{ message }}
</template>

<script>
import { state, socket } from './socket'; // replace './socket' with the actual path to the file where `state` and `socket` are defined

// import axios from 'axios';
// import GameBoard from './components/GameBoard.vue';

export default {
  name: 'App',
  data() {
    return {
      message: "Not connected"
    }
  },
  components: {
    // GameBoard,
  },
  async mounted() {
    //const response = await axios.post('http://127.0.0.1:5000/api', { message: "hi" });
    //alert(response.data.message)
      socket.on('connect', () => {
      this.message = state.connected ? "Connected" : "Not Connected";
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style> 
