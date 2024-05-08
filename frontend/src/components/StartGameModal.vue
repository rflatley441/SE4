<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 40px;"> Here's your game code <span style="color: #6666FF">{{ this.username }}</span></h1>
                <h2 style="font-size:80px">{{ this.gameCode }}</h2>
                <button v-if="!this.gameStarted" @click="this.startGame">Start New Game</button>
                <span v-else>Waiting for more players</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getFirestore, addDoc, getDocs, collection } from 'firebase/firestore';
import socket from '@/socket';
import router from '@/router';

export default {
    name: "StartGameModal",
    props: {
        isOpen: {
            default: false,
        },
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
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
            gameCode: 0,
            gameStarted: false,
        };
    },
    methods: {
        generateGameCode() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let gameCode = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                gameCode += characters.charAt(randomIndex);
            }
            return gameCode;
        },
        createGameSession() {
            this.gameCode = this.generateGameCode();
        },
        async startGame() {
            const db = getFirestore();
            const gamesCollectionRef = collection(db, 'games'); 

            // checks if the game already exists
            const querySnapshot = await getDocs(gamesCollectionRef);
            const existingGames = querySnapshot.docs.map(doc => doc.data());
            const gameExists = existingGames.some(game => game.gameCode === this.gameCode);

            // creates a new game in the database if game does not currently exist
            if (!gameExists) {
                await addDoc(gamesCollectionRef, {
                    players: [this.userId], 
                    gameCode: this.gameCode,
                });
            }

            this.gameStarted = true;

            // adds the user to the game room
            socket.emit('join', { username: this.username, room: this.gameCode })
        },
    },
    mounted() {
        if(this.gameCode == 0) {
            this.createGameSession();
        }
        socket.on('navigateToGame', (room) => {
            console.log("Navigating to game room", room);
            router.push(`/game/${room}`);
        });
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