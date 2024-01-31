<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld :msg="message"/>
</template>

<script>
import axios from 'axios';
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      message: ""
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    axios.post('http://localhost:5000/api/data')
    .then(response => {
        this.message = response.data.message;
    })
    .catch(error => console.error(error));
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
  margin-top: 60px;
}
</style>
