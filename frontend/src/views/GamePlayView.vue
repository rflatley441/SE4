<template>
    <div id="app">
        <div class="content">
            <div class="game-board"> 
                <GameBoard :playerHand="this.playerHand"/>
            </div>
            <div class="player-hand-background">
                <div class="player-hand">
                    <PlayerHand :playerHand="this.playerHand"/>
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
        ...mapGetters(['playerHand'])
    },
    methods: {
        ...mapActions(['fetchHand'])
    },
    async mounted() {
        await this.fetchHand();
        // comment
    }
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

.player-hand-background {
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

</style>