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
            @select-tile="selectTile"/>
        </section>
    </div>
</template>

<script>
import BoardTile from "./BoardTile.vue"
import { ref } from "vue"

export default {
    name: "GameBoard",
    props: {
        playerHand: {
            type: Array,
            required: true,
        }
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
    methods: {
        selectTile(payload) {
            let tileSelected = null;

            for (let i = 0; i < this.playerHand(0).length; i++) {
                if (this.playerHand(0)[i].selected == true){
                    tileSelected = i;
                }
            }

            if (tileSelected !== null) {
                this.tileList[payload.position].color = this.playerHand(0)[tileSelected].color;
                this.tileList[payload.position].shape = this.playerHand(0)[tileSelected].shape;

                this.tileList[payload.position].hidden = false;
                // tileList.value[payload.position].highlighted = true;
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
</style>