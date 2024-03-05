<template>
    <section class="game-board">
        <BoardTile 
        v-for="(tile, index) in tileList" 
        :key="`tile-${index}`" 
        :value="index" 
        :hidden="tile.hidden" 
        :position="tile.position"
        @select-tile="selectTile"/>
    </section>
</template>

<script>
import BoardTile from "./BoardTile.vue"
import { ref } from "vue"

export default {
    name: "GameBoard",
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
                position: i,
            })
        }

        const selectTile = (payload) => {
            tileList.value[payload.position].hidden = false;
            // tileList.value[payload.position].highlighted = true;
        }

        return {
           tileList,
           selectTile
        };
    }, 
}
</script>

<style scoped>
.game-board {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(12, 50px);
    grid-template-rows: repeat(12, 50px);
    position: absolute;
}
</style>