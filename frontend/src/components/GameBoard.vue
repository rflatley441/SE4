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
        ...mapGetters(['players'])
    },
    mutations: {
        incrementScore(state, payload) {
            state.players[payload.userId].score += payload.score;
     },    
    },
    methods: {
        ...mapActions(['updateHand', 'fetchHand', 'incrementRound', 'incrementScore']),

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
                this.$store.commit('removeTileFromHand', {
                    userId: this.userId,
                    tileIndex: tileSelected
                });
            }
        },
        async endTurn() {
            const nextPlayerId = (this.userId + 1) % this.players.length;
            await this.incrementRound(nextPlayerId);
            await this.updateHand(this.userId);
            await this.fetchHand();
            await this.calculateScore();
            await this.incrementScore({userId: this.userId, score: 1});
            console.log("Hello", this.players[this.userId].score)
        },
        calculateScore(gameState) {
        let score = 0;
        gameState.players.forEach(player => {
            player.lines.forEach(line => {
                score += line.length;
                if (this.isQwirkle(line)) {
                    score += 6;
                }
            });
            if (player.tiles.length === 0) {
                score += 6;
            }
        });
        this.updatePlayerScore({userId: this.userId, score: score});
        return score;
    },
    isQwirkle(line) {
        if (line.length !== 6) return false;
        const colors = new Set();
        const shapes = new Set();
        line.forEach(tile => {
            colors.add(tile.color);
            shapes.add(tile.shape);
        });
        return colors.size === 1 || shapes.size === 1;
    },

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