<template>
    <div id="app">
        <NavBar/>
        <div class="content">
            <div class="contents-container">
                <h1 style="font-size:80px"> Welcome, User!</h1>
                <div id="inputsContainer">
                    <button class="btn success" style="margin-top: 0px;"><router-link to="/game" class="footText">Play Game</router-link></button>
                    <br>
                    <button class="btn success" style="margin-top: 30px;" @click="openModal" >View Player Statistics</button>
                    <StatsModal :isOpen="isModalOpen" @modal-close="closeModal"/>
                    <br>
                    <button class="btn success" style="margin-top: 30px;">View Friends List</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import StatsModal from '@/components/StatsModal.vue';
import { ref } from 'vue';

 export default {
    name: "HomeView",
    components: {
        NavBar, 
        StatsModal
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
    background-image: url("@/assets/background.svg");
    background-size: cover;
}

.content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 80px;
    font-weight: bold;
    align-items: center;
    justify-content: center;
}

.contents-container {
    width: fit-content;
    padding: 40px;
    border-radius: 20px;
    background-color: rgba(238, 221, 221, 0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    margin: auto;
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