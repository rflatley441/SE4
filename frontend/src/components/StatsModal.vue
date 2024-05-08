<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 80px;"> <span style="color: #6666FF">{{ this.username }}'s</span> Statistics</h1>
                <h2 style="font-size:40px">High Score: {{ this.highScore }}</h2>
                <h2 style="font-size:40px">Total Points: {{ this.totalPoints }}</h2>
                <h2 style="font-size:40px">Wins: {{ this.wins }}</h2>
                <h2 style="font-size:40px">Losses: {{ this.losses }}</h2>
                <h2 style="font-size:40px">Draws: {{ this.draws }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default {
    name: "StatsModal",
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
        console.log("hello", user);
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        // gets user stats
        if(docSnap.exists()) {
            const data = docSnap.data()

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

.modal-mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    border-radius: 10px;
    top: 15%;
    left: 25%;
    width: 50%;
    height: 50%;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  justify-content: center;
  align-items: center; 
  width: 100%;
  height: 100%;
  margin: auto;
}

.modal-container {
    padding: 10px 30px;
    background-color: #e6e6ff;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 2px 8px #ccccff;
}

.close {
    color: #aaa;
    float: right;
    font-size: 50px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #353839;
    text-decoration: none;
    cursor: pointer;
}

</style>