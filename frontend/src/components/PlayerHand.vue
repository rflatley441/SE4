<template>
    <div class="player-hand">
        <div class="player-hand-grid">
            <BoardTile 
            v-for="(tile, index) in playerHand(0)" 
            :key="index" 
            :position="index" 
            :color="tile.color" 
            :shape="tile.shape" 
            :hidden="false" 
            :width="100" 
            :height="100"
            :selected="tile.selected"
            @select-tile="selectTile"/>
        </div>
    </div>
</template>

<script>
import BoardTile from './BoardTile.vue';

    export default {
        name: "PlayerHand",
        props: {
            playerHand: {
                type: Array,
                required: true
            }
        },
        components: {
            BoardTile,
        },
        methods: {
            selectTile(payload) {
                for (let i = 0; i < this.playerHand(0).length; i++) {
                    this.playerHand(0)[i].selected = false;
                }

                this.playerHand(0)[payload.position].selected = true;
            }
        },
    }
</script>

<style scoped>

.player-hand {
    width: auto;
}

.player-hand-grid {
    display: grid;
    grid-template-columns: repeat(6, 100px);
    grid-column-gap: 30px;
}
</style>