<template>
    <div class="game-board-container">
        <section class="game-board">
            <BoardTile 
            v-for="(tile, index) in tileList" 
            :key="`tile-${index}`" 
            :value="index" 
            :hidden="tile.hidden" 
            :position="tile.position"
            :color="tile.color"
            :shape="tile.shape"
            :width="50"
            :height="50"
            @select-tile="placeTile"/>
        </section>
    </div>
    <button class="end-turn-button" @click="this.endTurn">End Turn</button> 

</template>

<script>
import BoardTile from "./BoardTile.vue"
import { mapActions, mapGetters } from "vuex"
import { ref } from "vue"

export default {
    name: "GameBoard",
    props: {
        userId: {
            type: Number,
            required: true,
        },
        playerHand: {
            type: Array,
            required: true,
        },
    },
    components: {
        BoardTile,
    },
    setup() {
        const tileList = ref([])

        for (let i = 0; i < 144; i++) {
            tileList.value.push({
                value: i,
                hidden: true,
                // highlighted: false,
                color: '#fff',
                shape: '',
                position: i,
            })
        }

        return {
           tileList,
        };
    }, 
    computed: {
        ...mapGetters(['players', 'deck', 'winner', 'gameOver']),
    },
    methods: {
        ...mapActions(['updateHand', 'fetchHand', 'incrementRound', 'setGameOver']),

        determineWinner() {
        let highestScore = -1;
        let winner = ""
        console.log("winner function")

        if (this.deck.remaining == 0) {
            this.players.forEach((player, index) => {
            if (player.score > highestScore) {
                highestScore = player.score;
                winner = `Player ${index + 1} Wins!`;
            }
        });
        //return winner
        this.$store.dispatch('setGameOver', { winner: winner});
     
        }
      
    },

        calculateScore(userId) {
        
        // const playerHand = this.playerHand(userId);
        let amount = 0;
        let qwirkle = 0
        amount = 6 - 3;

        if (amount === 6){
            qwirkle = 6
        }

        let turn_score = qwirkle + amount
        console.log("qwirkle", qwirkle)
       
        this.$store.commit('updatePlayerScore', { userId: userId, amount: turn_score });
    },

        async placeTile(payload) {
            let tileSelected = null;

            for (let i = 0; i < this.players.playerHand; i++) {
                if (this.playerHand(this.userId)[i].selected == true){
                    tileSelected = i;
                    
                }
            }

            if (tileSelected !== null) {
                this.tileList[payload.position].color = this.playerHand(this.userId)[tileSelected].color;
                this.tileList[payload.position].shape = this.playerHand(this.userId)[tileSelected].shape;

                this.tileList[payload.position].hidden = false;
                // tileList.value[payload.position].highlighted = true;
                this.$store.commit('removeTileFromHand', {
                    userId: this.userId,
                    tileIndex: tileSelected
                });
            }
        },
        async endTurn() {
            this.calculateScore(this.userId);
            const nextPlayerId = (this.userId + 1) % 2;
            await this.updateHand(this.userId);
            await this.fetchHand();
            await this.incrementRound(nextPlayerId);
                if (this.deck.remaining == 0 && (this.players.some(player => player.hand.length === 0))){
                    this.determineWinner();
                }
            
        } 

    },
}
</script>

<style scoped>
.game-board-container {
    width: 600px;
}

.game-board {
    /* width: auto; */
    display: grid;
    grid-template-columns: repeat(12, 50px);
    grid-template-rows: repeat(12, 50px);
    /* position: absolute; */
}

.end-turn-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: black;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.end-turn-button:hover {
    background-color: #45a049;
}
</style>