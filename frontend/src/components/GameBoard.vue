<template>
    <div class="game-board-container">
        <section class="game-board">
            <BoardTile 
            v-for="(tile, index) in this.board" 
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
      </div>
    </div>

      </div>

</template>

<script>
import socket from "@/socket"
import BoardTile from "./BoardTile.vue"
import { mapActions, mapGetters } from "vuex"
import { getFirestore, doc, updateDoc, increment, getDoc } from 'firebase/firestore';


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
        gameId: {
            type: String,
            required: true,
        }
    },
    components: {
        BoardTile,
    },

    setup() {
        var tilesThisTurn = new Set()

        return {
           tilesThisTurn,
        };
    }, 
    computed: {
        ...mapGetters(['players', 'deck', 'winner', 'gameOver', 'board', 'tilesPlayed']),
        
    },
    expose: ['updateHighlightedBoardTiles'], // used by GamePlayView
    
    methods: {
        ...mapActions(['updateHand', 'fetchHand', 'incrementRound', 'setGameOver', 'updateBoard', 'fetchUsers', 'gameStart', 'updatePlayerScore', 'updateTilesPlayed']),
        
        /**
         * Calculates score for the current player using qwirkle rules
         */
        calculateScore(userId) {
            let baseScore = 0;
            let bonusScore = 0;

            this.tilesThisTurn.forEach(() => {
                let verticalScore = 1;
                let horizontalScore = 1;
                this.tilesThisTurn.forEach((position) => {
                    let verticalScore = 1;
                    let horizontalScore = 1;

                    let up = position - 12;
                    while (this.tilesPlayed.includes(up)) {
                        verticalScore++;
                        up -= 12;
                    }

                    let down = position + 12;
                    while (this.tilesPlayed.includes(down)) {
                        verticalScore++;
                        down += 12;
                    }

                    let left = position - 1;
                    while (position % 12 !== 0 && this.tilesPlayed.includes(left)) {
                        horizontalScore++;
                        left--;
                    }

                    let right = position + 1;
                    while (position % 12 !== 11 && this.tilesPlayed.includes(right)) {
                        horizontalScore++;
                        right++;
                    }

                    if (verticalScore === 6) {
                        bonusScore += 6;
                    }
                    if (horizontalScore === 6) {
                        bonusScore += 6;
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

                if (verticalScore > 1) {
                    baseScore += verticalScore - 1;
                }
                if (horizontalScore > 1) {
                    baseScore += horizontalScore - 1;
                }
            });

            baseScore += this.tilesThisTurn.size;
            baseScore += this.tilesThisTurn.size;

            let totalScore = baseScore + bonusScore;
            this.$store.dispatch('updatePlayerScore', { userId: userId, amount: totalScore });
        },  
        /**
         * Determines the winner of the game
         */
        async determineWinner() {
            let highestScore = -1;
            let winner = ""
            let winningPlayer;

            // sets player with the highest score as the winner
            if (this.deck.remaining == 0) {
                await this.players.forEach((player, index) => {
                    if (player.score > highestScore) {
                        highestScore = player.score;
                        winningPlayer = player;
                        winner = `Player ${index + 1} Wins!`;
                    }
                });

            let losingPlayer;

            if (winningPlayer != this.players[0]){
                losingPlayer = this.players[0];
            } else {
                losingPlayer = this.players[1]
            }

            const currentIndex = this.userId
            const currentPlayer = this.players[currentIndex];

            if (losingPlayer.score == winningPlayer.score){
                this.updatePlayerStats(highestScore, [0, 0, 1], currentPlayer.id);
            } else if (currentPlayer == winningPlayer){
                this.updatePlayerStats(highestScore, [1, 0, 0], winningPlayer.id); 
            } else {
                this.updatePlayerStats(losingPlayer.score, [0, 1, 0], losingPlayer.id);
            }
            //return winner
            this.$store.dispatch('setGameOver', { winner: winner});
            // user leaves room
            socket.emit('leave', { username: this.username, room: this.gameId })
            }
        },
        async updatePlayerStats(score, record, playerId){
            const db = getFirestore();
            const docRef = doc(db, 'users', playerId);
            const docSnap = await getDoc(docRef);
            await updateDoc(docRef,{
                wins: increment(record[0]),
                losses: increment(record[1]),
                draws: increment(record[2]),
                total_points: increment(score)
            })

            let top_score = 999999;
            if(docSnap.exists()) {
                const data = docSnap.data()
                top_score = data.high_score;
            }
            if (top_score < score){
                await updateDoc(docRef,{
                    wins: increment(record[0]),
                    losses: increment(record[1]),
                    draws: increment(record[2]),
                    total_points: increment(score),
                    high_score: top_score
                })
            }
        },        
        /**
         * Places a tile on the board
         * @param {Object} payload - the payload object
         */
        async placeTile(payload) {
            let tileSelected = null;

            const currentPlayerHand = this.players[this.userId].hand;

            tileSelected = this.getSelectedTileInHandIndex();
            this.updateHighlightedBoardTiles();

            if (tileSelected !== null && this.tilePlacementIsValid(payload)) {
                // changes the position on the board to the color and shape of the tile to be placed
                this.board[payload.position].color = currentPlayerHand[tileSelected].color;
                this.board[payload.position].shape = currentPlayerHand[tileSelected].shape;

                this.board[payload.position].hidden = false;
                this.tilesPlayed.push(payload.position);
                this.tilesThisTurn.add(payload.position);

                // removes the placed tile from the player's hand
                this.$store.commit('removeTileFromHand', {
                    userId: this.userId,
                    tileIndex: tileSelected
                });
                this.updateBoard(this.board);
                
                this.updateHighlightedBoardTiles();
            }
        },

        updateHighlightedBoardTiles(){
            let dummyPayload = {
                position: 0,
            };
        
            for (let i = 0; i < this.board.length; i++){
                dummyPayload.position = i;
                if (this.tilePlacementIsValid(dummyPayload)){
                    this.board[i].highlighted = true;
                } else {
                    this.board[i].highlighted = false;
                }
            }
        },

        getSelectedTileInHandIndex(){
            let selectedTile = null

            const currentPlayerHand = this.players[this.userId].hand;
            
            for (let i = 0; i < currentPlayerHand.length; i++) {
                if (currentPlayerHand[i].selected == true){
                    selectedTile = i;
                }
            }
            return selectedTile;
        },

        tilePlacementIsValid(payload){
            let tileSelected = null;

            const currentPlayerHand = this.players[this.userId].hand;
            tileSelected = this.getSelectedTileInHandIndex();

            if (tileSelected == null){
                return false;
            }

            if (this.tilesPlayed.length == 0){
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
                        return false;
                }
            } else if (!this.hasAdjacentTiles(payload)){
                return false;
            }

            if (!this.isValidInContextOfTurn(payload, this.tilesThisTurn)){
                return false;
            }

            // checking tile is selected and position is not already taken
            if (tileSelected !== null && !this.tilesPlayed.includes(payload.position)) {
                let tileColor = currentPlayerHand[tileSelected].color;
                let tileShape = currentPlayerHand[tileSelected].shape;
                let rowStart = payload.position - (payload.position % 12);
                let rowEnd = rowStart + 11;
                let verticalIncrement = 12;

                // NOTE: If all tiles are hidden, returns true automatically

                // checking vertical runs
                var seenColors = new Set();
                var seenShapes = new Set();
                var currentIndex = payload.position - verticalIncrement;
                while(!(currentIndex < 0 || this.board[currentIndex].hidden)){ // up
                    seenColors.add(this.board[currentIndex].color);
                    seenShapes.add(this.board[currentIndex].shape);
                    currentIndex = currentIndex - verticalIncrement;
                }
                currentIndex = payload.position + verticalIncrement;
                while(!(currentIndex > 143 || this.board[currentIndex].hidden)){ // down
                    seenColors.add(this.board[currentIndex].color);
                    seenShapes.add(this.board[currentIndex].shape);
                    currentIndex = currentIndex + verticalIncrement;
                }
                // must all be same color XOR same shape
                if (!this.isValidInIndividualRun(seenColors, seenShapes, tileColor, tileShape)){
                    return false;
                }

                // checking horizontal runs
                seenColors = new Set();
                seenShapes = new Set();
                currentIndex = payload.position - 1;
                while(!(currentIndex < rowStart || this.board[currentIndex].hidden)){ // left
                    seenColors.add(this.board[currentIndex].color);
                    seenShapes.add(this.board[currentIndex].shape);
                    currentIndex = currentIndex - 1;
                }
                currentIndex = payload.position + 1;
                while(!(currentIndex > rowEnd || this.board[currentIndex].hidden)){ // right
                    seenColors.add(this.board[currentIndex].color);
                    seenShapes.add(this.board[currentIndex].shape);
                    currentIndex = currentIndex + 1;
                }

                // must all be same color XOR same shape
                if (!this.isValidInIndividualRun(seenColors, seenShapes, tileColor, tileShape)){
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
                if (!this.board[tile].hidden){
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
                } while(!(currentIndex < leftBorder || this.board[currentIndex].hidden));

                currentIndex = maxTile;
                let rightBorder = maxTile + (11 - (maxTile % 12));
                do {
                    currentIndex = currentIndex + 1;
                    if (payload.position == currentIndex && currentIndex <= rightBorder){
                        return true;
                    }
                } while(!(currentIndex > rightBorder || this.board[currentIndex].hidden));
            } 
            if ((maxTile - minTile) >= 12 || (tilesThisTurn.size == 1)) {
                let currentIndex = minTile;
                let topBorder = 0;
                do {
                    currentIndex = currentIndex - 12;
                    if (payload.position == currentIndex && currentIndex >= topBorder){
                        return true;
                    }
                } while(!(currentIndex < topBorder || this.board[currentIndex].hidden));
                
                currentIndex = minTile;
                let bottomBorder = 143;
                do {
                    currentIndex = currentIndex + 12;
                    if (payload.position == currentIndex && currentIndex <= bottomBorder){
                        return true;
                    }
                } while(!(currentIndex > bottomBorder || this.board[currentIndex].hidden));
            }
            return false;
        },

        /**
         * Ends the turn upon users click end turn button
         * Calculates score, adds new tiles to the players hand, switches the turn to the other player, and check for any winner
         */
        async endTurn() {
            const currentIndex = this.userId
            const currentPlayer = this.players[currentIndex];
            this.calculateScore(currentIndex);

            const nextPlayerIndex = (currentIndex + 1) % this.players.length;
            const nextPlayer = this.players[nextPlayerIndex];

            this.tilesThisTurn = new Set();

            // Using current player ID for clarity and correctness
            await this.updateHand(currentPlayer.id);
            await this.updateTilesPlayed(this.tilesPlayed);
            await this.fetchHand(nextPlayer.id);
            await this.incrementRound(nextPlayerIndex);
            this.determineWinner();
            // sends the updated game state to the socket
            socket.emit('end-turn', { gameState: this.$store.state, room_id: this.gameId });
        }, 

    },
}
</script>

<style scoped>

.game-board {
    display: grid;
    grid-template-columns: repeat(12, 50px);
    grid-template-rows: repeat(12, 50px);
}

.game-board > * {
    border: 1px solid transparent;
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