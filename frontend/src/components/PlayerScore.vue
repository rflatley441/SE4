<template>
    <div>
      <div class="container">
        <div class="scoreboard">
          <span style="font-weight: bold; font-size: 60px; text-decoration: underline;">Scoreboard</span>
          <span style="font-size: 40px; font-weight: 500;">{{ this.players[0].name }}: {{ this.playerScore(this.players[0].id) }}</span>
          <span style="font-size: 40px; font-weight: 500;">{{ this.players[1].name }}: {{ this.playerScore(this.players[1].id) }}</span>
      </div>
      </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlayerScore',
  computed: {
    ...mapGetters(['playerScore', 'players'])
  },
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  background-color: #faaaa6;
  border-radius: 10px;
  width: 20%;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-size: 20px;
}
</style>