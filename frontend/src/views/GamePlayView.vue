<template>
    <div id="app">
        <NavBar/>
        <div class="content">
            <!-- Player Turn -->
            <div v-if="players.length > 0 && players[0].id && gameState.turn != null" style="font-size: 40px" :class="{ 'player-turn': true, 'player-1': players[gameState.turn].id === userId, 'player-2': gameState.turn === players[gameState.turn].id !== userId }">
                {{ players[gameState.turn].id === userId ? 'Your Turn' : `${ otherPlayerUsername }\'s Turn` }}
            </div>   
            <!-- Gameboard -->
            <div class="game-board"> 
                <GameBoard :playerHand="this.playerHand" :userId="this.gameState.turn" :gameId="this.gameState.id" ref="gameBoard"/>
            </div>
            <!-- Player Hand -->
            <div class="player-hand-background">
                <div class="player-hand">
                    <PlayerHand :hand="this.playerHand(this.userId)" :userId="this.userId" @update-highlighted="updateHighlightedInGameBoard"/>
                </div>
            </div>
            <!-- Scoreboard -->
            <div class="player-score">
               <PlayerScore/>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import GameBoard from '@/components/GameBoard.vue';
import PlayerHand from '@/components/PlayerHand.vue';
import { mapActions, mapGetters } from 'vuex';
import { ref } from 'vue';
import socket from '@/socket';
import { getAuth } from 'firebase/auth';
import PlayerScore from '@/components/PlayerScore.vue';

export default {
    name: "GamePlayView",
    components: {
        GameBoard,
        PlayerHand,
        PlayerScore,
        NavBar,
    },
    computed: {
        ...mapGetters(['playerHand', 'gameState', 'players']),
    },
    setup(){
        const gameBoard = ref(null);
        const gameStateLoaded = ref(false);

        return { gameBoard, gameStateLoaded };
    },
    data() {
        return {
            userId: 0,
            otherPlayerUsername: "",
        };
    },
    methods: {
        ...mapActions(['gameStart', 'updateGameState']),
        updateHighlightedInGameBoard(){
            this.$refs.gameBoard.updateHighlightedBoardTiles();
        },
        /**
         * Updates the game state when the other player makes a move
         * @param {Object} data - the updated game state
         */
        handleUpdateGameState(data) {
            this.updateGameState(data);
            this.otherPlayerUsername = this.players.find(player => player.id !== this.userId).name;
        },
    },
    async mounted() {
        const auth = getAuth();
        const user = auth.currentUser;
        this.userId = user.uid;

        // updates the current players game state when the game state is changed by the other player
        socket.on('update-game-state', this.handleUpdateGameState);
        this.otherPlayerUsername = this.players.find(player => player.id !== this.userId).name;
    },
}

</script>

<style scoped>
#app {
    display: flex;
    position: relative;
    min-height: calc(100vh - 16px); 
    background-color: #FDF5E6;
}

.content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 90px;
    box-sizing: border-box;
    background-color: #FDF5E6;
}

.game-board {
    position: absolute;
    padding: 30px;
    left: 50%; 
    top: 12%;
    transform: translateX(-50%); 
}    

.player-turn {
    position: center;
    font-size: x-large;
    animation: turn-text-animation 0.6s ease-in-out;
    font-weight: bold;
}

.player-1 {
    color: #f32e24; 
}

.player-2 {
    color: #2490F3;
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

.player-hand-background {
    display: flex;
    align-items: center; 
    justify-content: center; 
    white-space: nowrap; 
    position: absolute;
    bottom: 0;
    height: 150px;
    width: 850px; 
    border-radius: 10px;
    right: 0;
    background-color: #2490F3; 
}

.player-hand {
    display: flex;
    flex-wrap: nowrap; 
    gap: 20px; 
    padding: 25px 0; 
}

</style>