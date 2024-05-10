<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 60px;"> Here's your game code <span style="color: #6666FF">{{ this.username }}</span></h1>
                <h2 style="font-size:100px">{{ this.gameCode }}</h2>
                <button v-if="!this.gameStarted" class="start-button" @click="this.startGame">Start New Game</button>
                <span :style="{ fontSize: '40px', color: '#6666FF' }" v-else>Waiting for more players . . .</span>
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
        /**
         * Generates a random 6 character game code
         */
        generateGameCode() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let gameCode = '';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                gameCode += characters.charAt(randomIndex);
            }
            return gameCode;
        },
        /**
         * Creates a new game code for a new session
         */
        createGameSession() {
            this.gameCode = this.generateGameCode();
        },
        /**
         * Starts a new game session
         */
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
            socket.emit('join', { userId: this.userId, username: this.username, room: this.gameCode })
        },
    },
    mounted() {
        // creates a new game code only if the game code does not already exist
        if(this.gameCode == 0) {
            this.createGameSession();
        }
        // on navigate to game pushes the user to the game room
        socket.on('navigateToGame', (room) => {
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
    height: 70%;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
    justify-content: center;
    align-items: center; 
    width: 100%;
    height: 100%;
}
.modal-container {
    padding: 10px 30px 30px;
    background-color: #e6e6ff;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 2px 8px #ccccff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.start-button {
    border-color: transparent;
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    background-color: #FFB766;
    width: 600px;
    height: 70px;
    cursor: pointer;
    display: inline-block;
    margin: auto;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    font-family: 'Quicksand', sans-serif;
}

.close {
    color: #aaa;
    float: right;
    font-size: 50px;
    font-weight: bold;
    align-self: flex-end;
}

.close:hover,
.close:focus {
    color: #353839;
    text-decoration: none;
    cursor: pointer;
}

</style>