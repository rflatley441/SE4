<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 80px;"> <span style="color: #2490F3">{{ this.username }}'s</span> Statistics</h1>
                <h2 style="font-size:40px">High Score: {{ this.highScore }}</h2>
                <h2 style="font-size:40px">Total Points: {{ this.totalPoints }}</h2>
                <h2 style="font-size:40px">Wins: {{ this.wins }}</h2>
                <h2 style="font-size:40px">Losses : {{ this.losses }}</h2>
                <h2 style="font-size:40px">Draws: {{ this.draws }}</h2>
            </div>
        </div>
    </div>
    <!-- <div id="content"> -->
    <!-- <div id="statsModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h1 style="font-size: 80px;"> <span style="color: #2490F3">{{ this.username }}'s</span> Statistics</h1>
            <div class="stats">
                <h2 style="font-size:40px">High Score: {{ this.highScore }}</h2>
                <h2 style="font-size:40px">Total Points: {{ this.totalPoints }}</h2>
                <h2 style="font-size:40px">Wins: {{ this.wins }}</h2>
                <h2 style="font-size:40px">Losses : {{ this.losses }}</h2>
                <h2 style="font-size:40px">Draws: {{ this.draws }}</h2>
            </div>
        </div>
    </div> -->
    <!-- </div> -->
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default {
    name: "StatsView",
    props: {
        isOpen: {
            default: false,
        }
    },
    setup(props, {emit}) {
        const handleClose = () => {
            emit('modal-close')
        }

        return {
            handleClose
        };
    },
    data() {
        return {
            username: null,
            highScore: 0,
            totalPoints: 0,
            wins: 0,
            losses: 0,
            draws: 0,
        };
    },
    async created() {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            const data = docSnap.data()
            console.log("Document data:", data);

            this.username = data.username;
            this.highScore = data.high_score;
            this.totalPoints = data.total_points;
            this.wins = data.wins;
            this.losses = data.losses;
            this.draws = data.draws;
        }
    }
}

</script>

<style scoped>
/* #content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    box-sizing: border-box;
} */

.modal-mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    top: 15%;
    /* left: 0; */
    width: 50%;
    height: 100%;
    /* margin: auto; */
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  /* display: flex; */
  justify-content: center;
  align-items: center; 
  width: 100%;
  height: 100%;
}

.modal-container {
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.close {
    color: #aaa;
    float: right;
    font-size: 50px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

</style>