<template>
    <div class="player-hand">
        <div class="player-hand-grid">
            <BoardTile 
            v-for="(tile, index) in playerHand(this.userId)" 
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
            userId: {
                type: Number,
                required: true,
            },
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
                for (let i = 0; i < this.playerHand(this.userId).length; i++) {
                    this.playerHand(this.userId)[i].selected = false;
                }

                this.playerHand(this.userId)[payload.position].selected = true;
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