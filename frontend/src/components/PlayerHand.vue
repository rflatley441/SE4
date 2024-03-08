<template>
    <div class="player-hand">
        <div class="player-hand-grid">
            <BoardTile v-for="(tile, index) in tiles" :key="index" :color="tile[1]" :shape="tile[0]" :hidden="false" :width="100" :height="100" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BoardTile from './BoardTile.vue';

    export default {
        name: "PlayerHand",
        components: {
            BoardTile,
        },
        data() {
            return{
                tiles: {},
            }
        },
        methods: {
            async getTiles(){
                const { data } = await axios.get("http://127.0.0.1:5000/playerhand").catch(function(error) {console.log(error.response.data)});
                console.log(data)
                this.tiles = data;
            }
        }, 
        async beforeMount() {
            this.getTiles();
        }
    }
</script>

<style scoped>
.player-hand {
    background-color: #2490F3;
    width: 800px;
    height: 200px;
    position: absolute;
}

.player-hand-grid {
    display: grid;
    grid-template-columns: repeat(6, 100px);
    grid-column-gap: 30px;
    margin-top: 50px;
    position: relative;
    justify-content: center;
}
</style>