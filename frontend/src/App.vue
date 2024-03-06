<template>
  <LoginView />
</template>

<script>
//import axios from 'axios';
import LoginView from './components/LoginView.vue';

export default {
  name: 'App',
  data() {
    return {
      message: ""
    }
  },
  components: {
    LoginView
  },
  async mounted() {
    //const response = await axios.post('http://127.0.0.1:5000/api', { message: "hi" });
    //alert(response.data.message)
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
</style>./components/LoginView.vue
