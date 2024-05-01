<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <span class="close" @click="handleClose">&times;</span>
                <h1 style="font-size: 60px;">Join game</h1>
                    <div class="inputHolder">
                        <input type="gameCode" class="inputBox" v-model="gameCode" placeholder="Game code" />
                    </div>
                    <button @click="this.join">Join Game</button>
             </div>
        </div>
    </div>
</template>

<script>
// import socket from '@/socket';

import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, getDoc, updateDoc } from 'firebase/firestore';
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
            username: null,
            disabled: true,
        };
    },
    methods: {
        async join() {
            console.log("game code", this.gameCode)
            const db = getFirestore();
            const gamesCollectionRef = collection(db, 'games');
            const gamesQuerySnapshot = await getDocs(gamesCollectionRef);

            gamesQuerySnapshot.forEach(async (doc) => {
            const gameData = doc.data();
            if (gameData.gameCode === this.gameCode) {
                console.log('game code found', doc.id)
                this.disabled = false;

                if(!gameData.players.includes(this.userId)) {
                    await updateDoc(doc.ref, {
                    players: [... gameData.players, this.userId]
                });
                }

                socket.emit('join', { username: this.username, room: this.gameCode})
                router.push('/game')
                console.log("Player added to game: ", this.userId);
            }
        });
        }
    },
    async created() {
        const auth = getAuth();
        const user = auth.currentUser;
        const db = getFirestore();
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()) {
            const data = docSnap.data()

            this.username = data.username;
        }
        this.disabled = true;
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px 30px;
    background-color: #e6e6ff;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 2px 8px #ccccff;
}

.close {
    position: absolute;
    color: #aaa;
    top: 10px;
    right: 30px; 
    font-size: 50px;
    font-weight: bold;
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
    font-size: 30px;
    height: 60px;
    margin-top: 5px;
    padding-left: 10px;
}
</style>