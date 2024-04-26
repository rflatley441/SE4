<template>
    <div id="app">
        <NavBar/>
        <div class="content">
            <h1 style="font-size:80px"> Welcome, User!</h1>
            <div id="inputsContainer">
                <button class="btn success" style="margin-top: 0px;"><router-link to="/game" class="footText">Play Game</router-link></button>
                <br>
                <button class="btn success" style="margin-top: 30px;" @click="openModal" >View Player Statistics</button>
                <StatsModal :isOpen="isModalOpen" @modal-close="closeModal"/>
                <br>
                <button class="btn success" style="margin-top: 30px;">View Friends List</button>
            </div>
            <!-- <Star8ptTile id="starTile" fillColor="red" />
            <Star4ptTile id="star4ptTile" fillColor="blue" />
            <DiamondTile id="diamondTile" fillColor="orange" />
            <SquareTile id="squareTile" fillColor="yellow" />
            <CloverTile id="cloverTile" fillColor="green" /> -->
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
// import Star8ptTile from '@/assets/Star8ptTile.vue';
// import CircleTile from '@/assets/CircleTile.vue';
// import CloverTile from '@/assets/CloverTile.vue';
// import DiamondTile from '@/assets/DiamondTile.vue';
// import Star4ptTile from '@/assets/Star4ptTile.vue';
// import SquareTile from '@/assets/SquareTile.vue';
import StatsModal from '@/components/StatsModal.vue';
import { ref } from 'vue';

 export default {
    name: "HomeView",
    components: {
        // Star8ptTile, CloverTile, DiamondTile, Star4ptTile, SquareTile, 
        NavBar, 
        StatsModal
        // ,CircleTile
    },
    setup() {
        const isModalOpen = ref(false);

        const openModal = () => {
            isModalOpen.value = true;
        }

        const closeModal = () => {
            isModalOpen.value = false;
        }

        return {
            isModalOpen,
            openModal,
            closeModal,
        };
    }
 }
</script>

<style scoped>

#app {
    display: flex;
    position: relative;
    min-height: calc(100vh - 16px); 
    background-color: #FDF5E6;
}

.content {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 80px;
    font-weight: bold;
}

#starTile {
    position: absolute;
    left: 100px;
    top: 450px;
}
#circleTile {
    position: absolute;
    right: -140px;
    top: 0px;
}
#diamondTile {
    position: absolute;
    right: -100px;
    bottom: -200px;
    width: 300;
    height: 300;
}
#star4ptTile {
    position: absolute;
    left: -50px;
    bottom: 300px;
    width: 125;
    height: 125;
}
#squareTile {
    position: absolute;
    left: -100px;
    bottom: -200px;
    width: 250;
    height: 250;
}
#cloverTile {
    position: absolute;
    right: -50px;
    bottom: 200px;

}

#inputsContainer {
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 40px;
    padding-bottom: 40px;
}

.btn {
    border-color: transparent;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

h1 {
  color: #353839;
}

/* On mouse-over */
.btn:hover {
    background: #FFC999;
}

.success {
    background-color: #FFB766;
    width: 500px;
    height: 70px;
    font-size: 30px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    margin: auto;
    text-align: center;
    color: #353839;
}


#footer {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
}

.footText {
    font-size: 30px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    color: #353839;
    cursor: pointer;
    text-decoration: none;
}


</style>