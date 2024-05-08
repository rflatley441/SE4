<template>
    <div id="app">
        <NavBar/>
        <div class="content">
            <div class="contents-container">
                <h1 style="font-size:80px"> Welcome, {{ this.username }}!</h1>
                <div id="inputsContainer">
                    <!-- <button class="btn success" @click="join()">Test</button> -->
                    <button class="btn success" @click="openStartGameModal">Start Game</button><br> 
                    <StartGameModal :isOpen="isStartGameModalOpen" :userId="this.userId" :username="this.username" @modal-close="closeStartGameModal"/>
                    <button class="btn success" style="margin-top: 30px;" @click="openJoinGameModal">Join Game</button><br>
                    <JoinGameModal :isOpen="isJoinGameModal" :userId="this.userId" :username="this.username" @modal-close="closeJoinGameModal"/>
                    <!-- <button class="btn success" style="margin-top: 0px;"><router-link to="/game" class="footText">Play Game</router-link></button> -->
                    <button class="btn success" style="margin-top: 30px;" @click="openStatsModal" >View Player Statistics</button>
                    <StatsModal :isOpen="isStatsModalOpen" @modal-close="closeStatsModal"/>
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
import StartGameModal from '@/components/StartGameModal.vue'
import JoinGameModal from '@/components/JoinGameModal.vue'
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ref } from 'vue';

 export default {
    name: "HomeView",
    components: {
        NavBar, 
        StatsModal,
        StartGameModal,
        JoinGameModal
    },
    setup() {
        const isStatsModalOpen = ref(false);
        const isStartGameModalOpen = ref(false);
        const isJoinGameModal = ref(false);

        const openStatsModal = () => {
            isStatsModalOpen.value = true;
        }
        const openStartGameModal = () => {
            isStartGameModalOpen.value = true;
        }
        const openJoinGameModal = () => {
            isJoinGameModal.value = true;
        }

        const closeStatsModal = () => {
            isStatsModalOpen.value = false;
        }
        const closeStartGameModal = () => {
            isStartGameModalOpen.value = false;
        }
        const closeJoinGameModal = () => {
            isJoinGameModal.value = false;
        }

        return {
            isStatsModalOpen,
            openStatsModal,
            closeStatsModal,
            isStartGameModalOpen,
            openStartGameModal,
            closeStartGameModal,
            isJoinGameModal,
            openJoinGameModal,
            closeJoinGameModal
        };
    },
    data() {
        return {
            username: null,
            userId: null,
        };
    },
    async mounted() {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        this.userId = user.uid;
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            const data = docSnap.data()

            this.username = data.username;
        }
    },
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