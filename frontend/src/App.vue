<template>
  <BoardTile shape="square" color="#f00"/>
</template>

<script>
import axios from 'axios';
import BoardTile from './components/BoardTile.vue';

export default {
  name: 'App',
  data() {
    return {
      message: ""
    }
  },
  components: {
    BoardTile
  },
  async mounted() {
    const response = await axios.post('http://127.0.0.1:5000/api', { message: "hi" });
    alert(response.data.message)
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
