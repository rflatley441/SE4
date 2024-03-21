<template>
    <div>
        <div v-if="userId === 0" class="player1-score">
        <h2>Player 1 Score: {{ playerScore(userId) }}</h2>
    </div>
    <div v-else class="player2-score">
        <h2>Player 2 Score: {{ playerScore(userId) }}</h2>
    </div> 
    </div>

  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'PlayerScore',
    props: {
      userId: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapGetters(['playerScore'])
    },
  }
  </script>
  
  <style scoped>
  .player1-score {
    position: absolute;
    background-color: #d0140b;
    color: white;
    padding: 20px;
    width: 200px;
    bottom: 150px;
    text-align: center;
    border-radius: 5px;
  }
  .player2-score {
    position: absolute;
    background-color: #0b72d0;
    color: white;
    padding: 20px;
    left: 1642px;
    width: 200px;
    bottom: 150px;
    text-align: center;
    border-radius: 5px;
  }
  </style>