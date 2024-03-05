<template>
    <div class="player-hand">
        <BoardTile/>
        <BoardTile/>
        <BoardTile/>
        <BoardTile/>
        <BoardTile/>
        <BoardTile/>
    </div>
</template>

<script>
// import axios from 'axios';
import BoardTile from './BoardTile.vue';

    export default {
        name: "PlayerHand",
        components: {
            BoardTile,
        },
        methods: {
            getTiles(){
                // const path = "http://127.0.0.1:5000/players";
                // axios.get(path).then((res) => {
                //     console.log(res.data.hand)
                //     this.tiles = res.data.hand;
                // }).catch((error) => {
                //     console.error(error);
                // })
            }
        }
    }
</script>

<style scoped>
.player-hand {
    background-color: #2490F3;
    width: 800px;
    height: 200px;
    display: grid;
    grid-template-columns: repeat(6, 100px);
    grid-column-gap: 30px;
}
</style>