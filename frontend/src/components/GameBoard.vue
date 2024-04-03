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
        var tilesPlayed = new Set()

        for (let i = 0; i < 144; i++) {
            tileList.value.push({
                value: i,
                hidden: true,
                highlighted: true,
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
    methods: {
        ...mapActions(['updateHand', 'fetchHand', 'incrementRound']),

        async placeTile(payload) {
            let tileSelected = null;

            tileSelected = this.getSelectedTileInHandIndex();

            if (tileSelected !== null && this.tilePlacementIsValid(payload)) {
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

            if (tileSelected !== null) {
                let tileColor = this.playerHand(this.userId)[tileSelected].color;
                let tileShape = this.playerHand(this.userId)[tileSelected].shape;
                let rowStart = payload.position - (payload.position % 12);
                let rowEnd = rowStart + 11;
                let verticalIncrement = 12;

                // NOTE: If all tiles are hidden, returns true automatically

                // checking vertical runs
                var seenColors = new Set([tileColor]);
                var seenShapes = new Set([tileShape]);
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
                // must all be same color OR same shape
                if (seenColors.size > 1 && seenShapes.size > 1){
                    return false;
                }

                // checking horizontal runs
                seenColors = new Set([tileColor]);
                seenShapes = new Set([tileShape]);
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

                // must all be same color OR same shape
                if (seenColors.size > 1 && seenShapes.size > 1){
                    return false;
                }

                return true;
            }
            return false;
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