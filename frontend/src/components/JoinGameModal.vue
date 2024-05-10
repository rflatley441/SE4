<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 100px;">Join game</h1>
                <div class="inputHolder" style="padding-bottom: 20px;"> 
                    <input type="text" class="inputBox" v-model="gameCode" placeholder="Game code"/>
                </div>
                <span style="font-size: 30px">{{ this.message }}</span>
                <button class="join-button" @click="this.join">Join Game</button>
            </div>
        </div>
    </div>
</template>
<script>

import { getFirestore, getDocs, collection, updateDoc } from 'firebase/firestore';
import { ref } from 'vue';
import socket from '@/socket';
import { useRouter } from 'vue-router';
import router from '@/router';

export default {
    name: "JoinGameModal",
    props: {
        isOpen: {
            type: Boolean,
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
        const gameCode = ref('');
        const router = useRouter();
        const handleClose = () => {
            emit('modal-close')
        }

        return {
            handleClose,
            gameCode,
            router
        };
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        /**
         * Allows user to join a game
         */
        async join() {
            const db = getFirestore();
            const gamesCollectionRef = collection(db, 'games');
            const gamesQuerySnapshot = await getDocs(gamesCollectionRef);

            let gameExists = false;
            
            // Checks if the game exists and if the user can join
            gamesQuerySnapshot.forEach(async (doc) => {
            const gameData = doc.data();

            if (gameData.gameCode === this.gameCode) {
                gameExists = true;
                // Checks if the game is full
                if(gameData.players.length < 2) {
                    // if the user is not already in the game, adds the user to the game
                    if(!gameData.players.includes(this.userId) && gameData.players.length < 2) {
                        await updateDoc(doc.ref, {
                        players: [... gameData.players, this.userId]
                    });
                    }
                    socket.emit('join', { userId: this.userId, username: this.username, room: this.gameCode});
                } else {
                    this.message = "Game is full";
                }
            }

        });
        // If the game code does not exist, displays an error message
        if(!gameExists) {
            this.message = "Invalid game code";
        }
        }
    },
    mounted() {
        // starts the game and navigates to the game page
        socket.on('navigateToGame', (room) => {
            socket.emit('start-game', { room: this.gameCode });
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

.join-button {
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
    top: 10px;
    right: 30px; 
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

.inputHolder {
    display: flex;
    justify-content: center;
    align-items: center;
}

.inputBox {
    max-width: 100%;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 10px;
    font-size: 50px;
    height: 80px;
    margin-top: 5px;
    padding-left: 10px;
}
</style>