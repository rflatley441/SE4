<template>
    <div class="player-score">
      <h2>Player Score: {{ score }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PlayerScore',
    props: {
      score: {
        type: Number,
        required: true
      },
      userId: {
        type: Number,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .player-score {
    background-color: red;
    color: white;
    padding: 20px;
    width: 200px;
    text-align: center;
    border-radius: 5px;
  }
  </style>