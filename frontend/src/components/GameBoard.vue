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

    <!-- Winner Announcement Modal -->
    <div v-if="winner" class="modal">
    <div class="modal-content">
      <h2 class="winner-announcement">{{winner.winner}}</h2>
      <div class="modal-buttons">
        <router-link to="/home" class="modal-button">Home</router-link>    
        <router-link to="/game" class="modal-button">Play Again</router-link>
      </div>
    </div>

      </div>

</template>

<script>
import BoardTile from "./BoardTile.vue"
import { mapActions, mapGetters } from "vuex"
import { ref, computed } from "vue"
import store from "@/store"

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
        const deck = computed(() => store.getters.deck);
        const players = computed(() => store.getters.players);
        const gameOver = computed(() => store.getters.gameOver);
        const winner = computed(() => store.getters.winner);

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
           tileList, deck, players, gameOver, winner
        };
    }, 
    computed: {
        ...mapGetters(['players', 'deck', 'winner']),
    },
    methods: {
        ...mapActions(['updateHand', 'fetchHand', 'incrementRound', 'gameOver']),

        calculateScore(userId) {
        
        const playerHand = this.playerHand(userId);
        let amount = 0;
        let qwirkle = 0
        amount = 6 - playerHand.length;
        console.log("amount", amount)

        if (amount === 6){
            qwirkle = 6
        }

        let turn_score = qwirkle + amount
       
        this.$store.commit('updatePlayerScore', { userId: userId, amount: turn_score });
    },

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
        this.$store.commit('gameOver', { winner: winner});
     
        }
      
    },

        async placeTile(payload) {
            let tileSelected = null;

            for (let i = 0; i < this.playerHand(this.userId).length; i++) {
                if (this.playerHand(this.userId)[i].selected == true){
                    tileSelected = i;
                    
                }
            }

            if (tileSelected !== null) {
                this.tileList[payload.position].color = this.playerHand(this.userId)[tileSelected].color;
                this.tileList[payload.position].shape = this.playerHand(this.userId)[tileSelected].shape;

                this.tileList[payload.position].hidden = false;
                // tileList.value[payload.position].highlighted = true;
                console.log("identifierr", this.userId);
                this.$store.commit('removeTileFromHand', {
                    userId: this.userId,
                    tileIndex: tileSelected
                });
            }
        },
        async endTurn() {
            this.calculateScore(this.userId);
            const nextPlayerId = (this.userId + 1) % this.players.length;
            await this.updateHand(this.userId);
            await this.fetchHand();
            await this.incrementRound(nextPlayerId);
                if (this.deck.remaining == 0 && (this.players.some(player => player.hand.length === 0))){
                    this.winnerMessage = this.determineWinner();
                }
            console.log("tiles remaining" , this.deck.remaining)

        }, 

    },
}
</script>

<style scoped>
/* .game-board-container {
    width: 600px;
} */

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

.game-board-container {
    position: relative; 
    width: 600px;
    margin: 0 auto; 
}

.modal {
    position: absolute; 
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #000; 
    color: #fff; 
    padding: 60px; 
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2); 
    width: 80%; 
    text-align: center;
    position: relative; 
    left: 0%; 
    top: 0%;
}

.winner-announcement {
  font-size: 2em; 
  margin-bottom: 1em; 
}

.modal-buttons {
  display: flex;
  justify-content: center; 
  gap: 3em; 
}

.modal-button {
  text-decoration: none;
  padding: 10px 20px;
  color: white;
  background-color: #444;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-button:hover {
  background-color: #667;
}
</style>