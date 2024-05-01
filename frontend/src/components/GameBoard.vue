<template>
    <div class="game-board-container">
        <section class="game-board">
            <BoardTile 
            v-for="(tile, index) in tileList" 
            :key="`tile-${index}`" 
            :value="index" 
            :hidden="tile.hidden" 
            :highlighted="tile.highlighted"
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
import { ref } from "vue"

export default {
    name: "GameBoard",
    props: {
        userId: {
            type: Number,
            required: true,
        },
        playerId: { // Actual player identifier
            type: String,
            required: true
        },
        playerHand: {
            type: Array,
            required: true,
        },
    },
    components: {
        BoardTile,
    },
    async mounted() {
        await this.$store.dispatch('fetchUsers');
        await this.$store.dispatch('gameStart')
    
},
    setup() {
        const tileList = ref([])
        var tilesPlayed = new Set()
        var tilesThisTurn = new Set()

        for (let i = 0; i < 144; i++) {
            tileList.value.push({
                value: i,
                highlighted: false,
                hidden: true,
                color: '#fff',
                shape: '',
                position: i,
            })
        }

        return {
           tileList,
           tilesPlayed,
           tilesThisTurn,
        };
    }, 
    computed: {
        ...mapGetters(['players', 'deck', 'winner', 'gameOver']),
    },
    expose: ['updateHighlightedBoardTiles'], // used by GamePlayView
    
    methods: {
        ...mapActions(['updateHand', 'fetchHand', 'incrementRound', 'setGameOver', 'fetchUsers', 'gameStart', 'updatePlayerScore']),

        calculateScore(userId) {
        let baseScore = 0;
        let bonusScore = 0;

    this.tilesThisTurn.forEach((position) => {
        let verticalScore = 1;
        let horizontalScore = 1;

        let up = position - 12;
        while (this.tilesPlayed.has(up)) {
            verticalScore++;
            up -= 12;
        }

        let down = position + 12;
        while (this.tilesPlayed.has(down)) {
            verticalScore++;
            down += 12;
        }

        let left = position - 1;
        while (position % 12 !== 0 && this.tilesPlayed.has(left)) {
            horizontalScore++;
            left--;
        }

        let right = position + 1;
        while (position % 12 !== 11 && this.tilesPlayed.has(right)) {
            horizontalScore++;
            right++;
        }

        if (verticalScore === 6) {
            bonusScore += 6;
        }
        if (horizontalScore === 6) {
            bonusScore += 6;
        }

        if (verticalScore > 1) {
            baseScore += verticalScore - 1;
        }
        if (horizontalScore > 1) {
            baseScore += horizontalScore - 1;
        }
    });

    baseScore += this.tilesThisTurn.size;

    let totalScore = baseScore + bonusScore;
    this.$store.dispatch('updatePlayerScore', { userId: userId, amount: totalScore });
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
        this.$store.dispatch('setGameOver', { winner: winner});
     
        }
      
    },

        async placeTile(payload) {
            let tileSelected = null;

            tileSelected = this.getSelectedTileInHandIndex();
            this.updateHighlightedBoardTiles();

            if (tileSelected !== null && this.tilePlacementIsValid(payload)) {
                this.tileList[payload.position].color = this.playerHand(this.userId)[tileSelected].color;
                this.tileList[payload.position].shape = this.playerHand(this.userId)[tileSelected].shape;

                this.tileList[payload.position].hidden = false;
                this.tilesPlayed.add(payload.position);
                this.tilesThisTurn.add(payload.position);
                // tileList.value[payload.position].highlighted = true;
                console.log("identifierr", this.userId);
                this.$store.commit('removeTileFromHand', {
                    userId: this.userId,
                    tileIndex: tileSelected
                });
                this.updateHighlightedBoardTiles();
            }
        },

        updateHighlightedBoardTiles(){
            let dummyPayload = {
                position: 0,
            };
            for (let i = 0; i < this.tileList.length; i++){
                dummyPayload.position = i;
                if (this.tilePlacementIsValid(dummyPayload)){
                    this.tileList[i].highlighted = true;
                } else {
                    this.tileList[i].highlighted = false;
                }
            }
        },

        getSelectedTileInHandIndex(){
            let selectedTile = null
            for (let i = 0; i < this.playerHand(this.userId).length; i++) {
                if (this.playerHand(this.userId)[i].selected == true){
                    selectedTile = i;
                }
            }
            return selectedTile;
        },
        tilePlacementIsValid(payload){
            let tileSelected = null;

            tileSelected = this.getSelectedTileInHandIndex();

            if (tileSelected == null){
                return false;
            }

            if (this.tilesPlayed.size == 0){
                switch(payload.position){
                    case 65:
                        return true;
                    case 66:
                        return true;
                    case 77:
                        return true;
                    case 78:
                        return true;
                    default:
                        console.log("Not valid as first tile placement!");
                        return false;
                }
            } else if (!this.hasAdjacentTiles(payload)){
                console.log("No adjacent tiles!")
                return false;
            }

            if (!this.isValidInContextOfTurn(payload, this.tilesThisTurn)){
                console.log("Not valid in context of turn!");
                return false;
            }

            // checking tile is selected and position is not already taken
            if (tileSelected !== null && !this.tilesPlayed.has(payload.position)) {
                let tileColor = this.playerHand(this.userId)[tileSelected].color;
                let tileShape = this.playerHand(this.userId)[tileSelected].shape;
                let rowStart = payload.position - (payload.position % 12);
                let rowEnd = rowStart + 11;
                let verticalIncrement = 12;

                // NOTE: If all tiles are hidden, returns true automatically

                // checking vertical runs
                var seenColors = new Set();
                var seenShapes = new Set();
                var currentIndex = payload.position - verticalIncrement;
                while(!(currentIndex < 0 || this.tileList[currentIndex].hidden)){ // up
                    seenColors.add(this.tileList[currentIndex].color);
                    seenShapes.add(this.tileList[currentIndex].shape);
                    currentIndex = currentIndex - verticalIncrement;
                }
                currentIndex = payload.position + verticalIncrement;
                while(!(currentIndex > 143 || this.tileList[currentIndex].hidden)){ // down
                    seenColors.add(this.tileList[currentIndex].color);
                    seenShapes.add(this.tileList[currentIndex].shape);
                    currentIndex = currentIndex + verticalIncrement;
                }
                // must all be same color XOR same shape
                if (!this.isValidInIndividualRun(seenColors, seenShapes, tileColor, tileShape)){
                    console.log("Not valid as vertical run!");
                    return false;
                }

                // checking horizontal runs
                seenColors = new Set();
                seenShapes = new Set();
                currentIndex = payload.position - 1;
                while(!(currentIndex < rowStart || this.tileList[currentIndex].hidden)){ // left
                    seenColors.add(this.tileList[currentIndex].color);
                    seenShapes.add(this.tileList[currentIndex].shape);
                    currentIndex = currentIndex - 1;
                }
                currentIndex = payload.position + 1;
                while(!(currentIndex > rowEnd || this.tileList[currentIndex].hidden)){ // right
                    seenColors.add(this.tileList[currentIndex].color);
                    seenShapes.add(this.tileList[currentIndex].shape);
                    currentIndex = currentIndex + 1;
                }

                // must all be same color XOR same shape
                if (!this.isValidInIndividualRun(seenColors, seenShapes, tileColor, tileShape)){
                    console.log("Not valid as horizontal run!");
                    return false;
                }

                return true;
            }
            return false;
        },
        hasAdjacentTiles(payload){
            var adjacentTiles = new Set();
            if (payload.position >= 12){
                adjacentTiles.add(payload.position - 12);
            }
            if (payload.position <= 131){
                adjacentTiles.add(payload.position + 12);
            }
            if (payload.position % 12 != 0){
                adjacentTiles.add(payload.position - 1);
            }
            if (payload.position % 12 != 11){
                adjacentTiles.add(payload.position + 1)
            }
            for (let tile of adjacentTiles){
                if (!this.tileList[tile].hidden){
                    return true;
                }
            }
            return false;
        },
        isValidInIndividualRun(seenColors, seenShapes, tileColor, tileShape){
            if (seenColors.has(tileColor) && seenShapes.has(tileShape)){
                return false;
            }
            seenColors.add(tileColor);
            seenShapes.add(tileShape);
            if (seenColors.size > 1 && seenShapes.size > 1){
                return false;
            }
            return true;
        },
        isValidInContextOfTurn(payload, tilesThisTurn){
            if (tilesThisTurn.size == 0){
                return true;
            }

            var maxTile = -1;
            var minTile = 144;

            // determining vertical and horizontal condition
            for (let tile of tilesThisTurn){
                if (tile > maxTile){
                    maxTile = tile;
                }
                if (tile < minTile){
                    minTile = tile;
                }
            }
            
            if ((maxTile - minTile) < 12 || (tilesThisTurn.size == 1)){
                let currentIndex = minTile;
                let leftBorder = minTile - (minTile % 12);
                do {
                    currentIndex = currentIndex - 1;
                    if (payload.position == currentIndex && currentIndex >= leftBorder){
                        return true;
                    }
                } while(!(currentIndex < leftBorder || this.tileList[currentIndex].hidden));

                currentIndex = maxTile;
                let rightBorder = maxTile + (11 - (maxTile % 12));
                do {
                    currentIndex = currentIndex + 1;
                    if (payload.position == currentIndex && currentIndex <= rightBorder){
                        return true;
                    }
                } while(!(currentIndex > rightBorder || this.tileList[currentIndex].hidden));

                console.log("horizontal failure!");
            } 
            if ((maxTile - minTile) >= 12 || (tilesThisTurn.size == 1)) {
                let currentIndex = minTile;
                let topBorder = 0;
                do {
                    currentIndex = currentIndex - 12;
                    if (payload.position == currentIndex && currentIndex >= topBorder){
                        return true;
                    }
                } while(!(currentIndex < topBorder || this.tileList[currentIndex].hidden));
                
                currentIndex = minTile;
                let bottomBorder = 143;
                do {
                    currentIndex = currentIndex + 12;
                    if (payload.position == currentIndex && currentIndex <= bottomBorder){
                        return true;
                    }
                } while(!(currentIndex > bottomBorder || this.tileList[currentIndex].hidden));

                console.log("vertical failure!");
            }
            return false;
        },

        async endTurn() {

            const currentIndex = this.userId
            const currentPlayer = this.players[currentIndex];
            console.log("current player", currentPlayer)
            //this.calculateScore(currentPlayer.id);

            const nextPlayerIndex = (currentIndex + 1) % this.players.length;
            const nextPlayer = this.players[nextPlayerIndex];
            console.log("next player" , nextPlayer)
            if (!nextPlayer) {
                console.error("Next player not found at index:", nextPlayerIndex);
                return;
            }

            this.tilesThisTurn = new Set();

            // Using current player ID for clarity and correctness
            await this.updateHand(currentPlayer.id);
            console.log("Next Player ID", nextPlayer.id);
            await this.fetchHand(nextPlayer.id);
            await this.incrementRound(nextPlayer.id);

            // Check for game ending conditions
            if (this.deck.remaining === 0 && this.players.some(player => player.hand.length === 0)) {
                this.determineWinner();
            }
            console.log("Tiles remaining", this.deck.remaining);
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