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
</template>

<script>
import BoardTile from "./BoardTile.vue"
import { mapActions } from "vuex"
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
        ...mapActions(['updateHand', 'fetchHand', 'updatePile']),

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

                await this.updateHand(this.userId)
                await this.fetchHand()
                await this.updatePile({
                    shape: this.tileList[payload.position].shape,
                    color: this.tileList[payload.position].color,
                    position: payload.position
                });
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