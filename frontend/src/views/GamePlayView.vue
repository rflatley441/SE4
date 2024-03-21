<template>
    <div id="app">
        <div id="navBar">
            <div class="navItems">
                <router-link to="/" class="navItem">Logout</router-link>
                <router-link to="/home" class="navItem">Home</router-link>
                <router-link to="/faq" class="navItem">How to Play</router-link>
            </div>
                
        </div>
        <div class="content">
            <div class="game-board"> 
                <!-- right now i am just setting the user ids to 0 when implementing dual players they will need to be changed based off round -->
                <GameBoard :playerHand="this.playerHand" :userId="0"/>
            </div>
            <div class="player-hand-background">
                <div class="player-hand">
                    <PlayerHand :playerHand="this.playerHand" :userId="0"/>
                </div>
            </div>

            <div class="player-2-hand-background">
                <div class="player-hand-2">
                    <PlayerHand :playerHand="this.playerHand" :player="this.players[1]"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import GameBoard from '@/components/GameBoard.vue';
import PlayerHand from '@/components/PlayerHand.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "GamePlayView",
    components: {
        GameBoard,
        PlayerHand,
    },
    computed: {
        ...mapGetters(['playerHand', 'players'])
    },
    methods: {
        ...mapActions(['fetchHand']),
    },
    async mounted() {
        await this.fetchHand();
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
}

.game-board {
    position: absolute;
    padding: 30px;
    left: 50%; 
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

.player-hand-background, .player-2-hand-background {
    display: flex;
    align-items: center; 
    justify-content: center; 
    overflow-x: auto; 
    overflow-y: hidden; 
    white-space: nowrap; 
    position: absolute;
    bottom: 0;
    height: 150px;
    width: 400px; 
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

#navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fbfafa;
    z-index: 1000;
    padding: 10px 20px;
}

.navItem {
    color: #333;
    text-decoration: none;
    margin-right: 20px;
    font-size: 25px;
}

</style>