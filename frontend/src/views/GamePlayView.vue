<template>
    <div id="app">
        <NavBar/>
        <div class="content">
   <div :class="{ 'player-turn': true, 'player-1': this.gameState.turn === 0, 'player-2': this.gameState.turn === 1 }">
            {{ this.gameState.turn === 0 ? 'Player 1\'s Turn' : 'Player 2\'s Turn' }}
        </div>            <div class="game-board"> 
                <!-- right now i am just setting the user ids to 0 when implementing dual players they will need to be changed based off round -->
                <GameBoard :playerHand="this.playerHand" :userId="this.gameState.turn"/>
            </div>
            <div class="player-hand-background">
                <div class="player-hand">
                    <PlayerHand :playerHand="this.playerHand" :userId="1"/>
                </div>
            </div>

            <div class="player-2-hand-background">
                <div class="player-2-hand">
                    <PlayerHand :playerHand="this.playerHand" :userId="0"/>
                </div>
            </div>

            <div class="player-score">
                <PlayerScore :userId="0"/>
            </div>

            <div class="player-score">
                <PlayerScore :userId="1"/>
            </div>

        </div>
        <div>
            Score: {{ score }}
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import GameBoard from '@/components/GameBoard.vue';
import PlayerHand from '@/components/PlayerHand.vue';
import PlayerScore from '@/components/PlayerScore.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "GamePlayView",
    components: {
        GameBoard,
        PlayerHand,
        PlayerScore,
        NavBar,
    },
    computed: {
        ...mapGetters(['playerHand', 'gameState']),
    },
    methods: {
        ...mapActions(['gameStart']),
    },
    async mounted() {
        await this.gameStart();
    },
    
}

</script>

<style scoped>
#app {
    display: flex;
    position: relative;
    min-height: calc(100vh - 16px); 
}

.content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    box-sizing: border-box;
}

.game-board {
    position: absolute;
    padding: 30px;
    left: 50%; 
    top: 10%;
    transform: translateX(-50%); 
}    

/*  .player-hand-background {
    background-color: #2490F3;
    width: 850px;
    height: 150px;
    position: absolute;
    bottom: 0; 
    right: 0; 
}

.player-hand {
    position: absolute;
    padding: 20px;
    padding-right: 50px;
    bottom: 0; 
    right: 0; 
} 

 .player-2-hand-background {
    background-color: #f32e24;
    width: 850px;
    height: 150px;
    position: absolute;
    bottom: 0; 
    left: 0;
}

.player-2-hand {
    position: absolute;
    padding: 20px;
    padding-right: 50px;
    bottom: 0; 
    left: 0; 
    
}  */

.player-turn {
    position: center;
    font-size: x-large;
    animation: turn-text-animation 0.6s ease-in-out;
    font-weight: bold;
}

.player-1 {
    color: #f32e24; /* Change this to the desired color for Player 1 */
}

.player-2 {
    color: #2490F3; /* Change this to the desired color for Player 2 */
}

@keyframes turn-text-animation {
    0% {
        opacity: 0;
        transform: translateX(-20px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.player-hand-background, .player-2-hand-background {
    display: flex;
    align-items: center; 
    justify-content: center; 
    white-space: nowrap; 
    position: absolute;
    bottom: 0;
    height: 150px;
    width: 850px; 
}

.player-hand, .player-2-hand {
    display: flex;
    flex-wrap: nowrap; 
    gap: 20px; 
    padding: 25px 0; 
}

.player-hand-background {
    right: 0;
    background-color: #2490F3; 
}

.player-2-hand-background {
    left: 0;
    background-color: #f32e24; 
}


</style>