<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 80px;"> Here's your game code <span style="color: #6666FF">{{ this.username }}</span></h1>
                <h2 style="font-size:40px">{{ this.gameCode }}</h2>
                <button @click="this.join" :disabled="this.disabled"><span v-if="this.disabled">Waiting for more players</span><span v-else>Play Game</span></button>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, getDocs, collection } from 'firebase/firestore';
import socket from '@/socket';
import router from '@/router';

export default {
    name: "StartGameModal",
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
            gameCode: 0,
            username: null,
            gameCreated: false,
            disabled: true,
        };
    },
    mounted() {
        socket.on('start-game', () => {
            this.disabled = false;
        });
    },
    beforeUnmount() {
        socket.off('start-game');
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
        async createGameSession() {
            const auth = getAuth();
            const user = auth.currentUser;
            const db = getFirestore();
            const docRef = doc(db, 'users', user.uid);
            const gamesCollectionRef = collection(db, 'games');
            const userDocSnap = await getDoc(docRef);
            const gamesQuerySnapshot = await getDocs(gamesCollectionRef);
            let inGame = false;

            gamesQuerySnapshot.forEach((doc) => {
                const gameData = doc.data();
                if (gameData.players && gameData.players.includes(user.uid)) {
                    console.log('User found in game:', doc.id)
                    inGame = true;
                    this.gameCode = gameData.gameCode;
                }
            });

            if (!inGame) {
                this.gameCode = this.generateGameCode();

                const newGameDocRef = await addDoc(gamesCollectionRef, {
                    players: [user.uid], 
                    gameCode: this.gameCode,
                });
                console.log("new game", newGameDocRef)
            } 

            if(userDocSnap.exists()) {
                const data = userDocSnap.data()

                this.username = data.username;
            }
            socket.emit('join', { username: this.username, room: this.gameCode })
        },
        join() {
            router.push('/game')
        }
    },
    watch: {
        isOpen(newVal) {
            if (newVal && !this.gameCreated) {
                this.createGameSession();
                this.gameCreated = true;
            } else if(newVal) {
                socket.emit('join', { username: this.username, room: this.gameCode });
            }
        },
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