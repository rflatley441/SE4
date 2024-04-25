<template>
    <NavBar/>
    <div id="content">
        <h1 style="font-size: 80px;"> {{ this.username }}'s Statistics</h1>
        <h2 style="font-size:40px">High Score: {{ this.highScore }}</h2>
        <h2 style="font-size:40px">Total Points: {{ this.totalPoints }}</h2>
        <h2 style="font-size:40px">Wins: {{ this.wins }}</h2>
        <h2 style="font-size:40px">Losses : {{ this.losses }}</h2>
        <h2 style="font-size:40px">Draws: {{ this.draws }}</h2>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default {
    name: "StatsView",
    components: {
        NavBar,
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
.content {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    box-sizing: border-box;
}
</style>