<template>
    <div class="player-hand">
        <div class="player-hand-grid">
            <BoardTile 
            v-for="(tile, index) in this.hand" 
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
import { mapGetters } from 'vuex';


    export default {
        name: "PlayerHand",
        props: {
            userId: {
                type: Number,
                required: true,
            },
            hand: {
                type: Array,
                required: true
            }
        },
        components: {
            BoardTile,
        },
        computed: {
            ...mapGetters(['gameState', 'playerHand', 'players'])
        },
        methods: {
            /**
             * Highlights selected tile in the player's hand
             */
            selectTile(payload) {
                // deselect all other tiles
                for (let i = 0; i < this.playerHand(this.userId).length; i++) {
                    this.playerHand(this.userId)[i].selected = false;
                } 
                // select the clicked tile if it's the player's turn
                if (this.players[this.gameState.turn].id == this.userId) {
                    this.playerHand(this.userId)[payload.position].selected = true;
                    console.log("SELECTED TILE:", this.playerHand(this.userId))
                }
                this.$emit('updateHighlighted');
            }
        },
        mounted() {
            console.log("mounted")
            // console.log(this.playerHand(this.userId));
        }  ,
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