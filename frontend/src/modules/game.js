import axios from "axios";
import { db } from '@/services/firebase.js'; 
import { collection, getDocs, query, where } from 'firebase/firestore';

// import { collection, getDocs } from 'firebase/firestore';


const state = {
    game: false,
    round: 0,
    turn: null,
    winner: null,
    finished: false,
    users: [],

    players: [
        {
            name: 'player1',
            score: 0,
            hand: [],
            id: "",
        },
        {
            name: 'player2',
            score: 0,
            hand: [],
            id: "",
        }
    ],

    deck: {
        deck_id: null,
        remaining: null,
    },

    pile: [
        {tile: null},
        {tile: null},
    ],
};

const getters = {
    gameState: (state) => {
        return {
            gameStatus: state.game,
            turn: state.turn,
            round: state.round,
            finished: state.finished
        };
    },
    players: (state) => state.players,
    playerHand: (state) => (id) => state.players[id].hand,
    playerScore: (state) => (id) => state.players[id].score,
    deck: (state) => state.deck,
    pile: (state) => state.pile,
    gameOver: (state) => state.finished,
    winner: (state) => state.winner,
    users: state => state.users, // accessing users to get their ids
};

const actions = {
    async fetchDeck({commit}) {
        try {
            const response = await axios.get("http://127.0.0.1:5000/deck");
            commit('setDeck', response.data);
        } catch(error) {
            console.error(error.response.data)
        }
    },

    async fetchUsers({ commit }) {
        const gameCode = 1; 
        console.log("Fetching users with specific game code:", gameCode);
        try {
            const usersRef = collection(db, 'users');
            const queryConstraint = query(usersRef, where('gameCode', '==', gameCode));
            const snapshot = await getDocs(queryConstraint);
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("users", users)
            commit('setUsers', users);
            console.log("Users with gameCode", gameCode, ":", users);
        } catch (error) {
            console.error("Error fetching users with specific game code:", error);
        }
    },

    async fetchHand({ commit, dispatch, state }, playerId) {
        const user = state.players.find(player => player.id === playerId);
        if (user) {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/playerhand`);
                console.log("data response", response.data);

                const playersData = response.data.slice(1); // cuts out the remaining tiles info
                for (const playerData of playersData) {
                    console.log("playerData", playerData)
                    const playerId = playerData.userId; 
                    const hand = playerData.hand;
                    console.log("playerId in loop",playerId)
                    console.log("player hand in loop", hand)
                    commit('setHand', {
                        'playerId': playerId,
                        'hand': hand
                    });
                }
                dispatch('updateTilesAmount', response.data[0].remaining);
            } catch (error) {
                console.error("Error fetching hand for playerId:", playerId, ";", error.response.data);
            }
        } else {
            console.error("User not found for playerId:", playerId);
        }
    },

    async updateHand({ commit, state }, userId) {
        const player = state.players.find(player => player.id === userId);
    
        if (player) {
            try {
                const response = await axios.post("http://127.0.0.1:5000/playerhand", {
                    userId: userId,
                    hand: player.hand,
                });
    
                response.data.forEach(item => {
                    if (item.hand && item.userId) {
                        commit('setHand', {
                            playerId: item.userId,
                            hand: item.hand
                        });
                    }
                });
    
                console.log("Updated hand:", response);
            } catch (error) {
                console.error("Error updating hand for player:", userId, ";", error.response.data);
            }
        } else {
            console.error("Player not found with userId:", userId);
        }
    },
    
    updateTilesAmount({commit}, amount) {
        commit('updateTilesAmount', amount);
    },

    incrementRound({commit}, userId) {
        commit('incrementRound');
        commit('setTurn', userId);
    },

    randomStart({commit}) {
        let random = Math.round(Math.random());
        commit('setTurn', random);
    },
    async gameStart({ commit, dispatch, state }) {
    
        const player1Id = state.players[0].id; 
        console.log("player 1 id" , state.players[0].id)
        const player2Id = state.players[1].id; 
        console.log("player 2 id" , state.players[1].id)

        commit('restartGame');
        try {
            await axios.post("http://127.0.0.1:5000/initialize_game", {
                player1_id: player1Id,
                player2_id: player2Id
            });
    
            await dispatch('fetchDeck');
            await Promise.all([
                dispatch('fetchHand', player1Id),
                dispatch('fetchHand', player2Id)
            ]);
            dispatch('randomStart'); 
            commit('setGameStart', true);
        } catch (error) {
            console.error("Error starting game:", error.response ? error.response.data : error);
        }
    },
    
    

    setGameOver({commit}, winner) {
        commit('gameOver', winner);
    }, 

    updatePlayerScore({commit}, {userId, amount}) {
        commit('updatePlayerScore', { userId: userId, amount: amount });

    }, 
};

const mutations = {
    restartGame: (state) => {
        state.finished = false;
        state.round = 0;
        state.winner = "";
        state.players[0].hand = [];
        state.players[1].hand = [];
        state.pile = [{tile: null}, {tile: null}]
    },
    setGameStart: (state, value) => (state.game = value),
    setTurn: (state, userId) => (state.turn = userId),
    gameOver: (state, winner) => {
        state.winner = winner;
        state.finished = true;
    },
    incrementRound: (state) => (state.round++),
    setDeck: (state, deck) => {
        state.deck.deck_id = deck.id;
        state.deck.remaining = deck.remaining;
    },
    setHand: (state, payload) => {
        let userId = payload.playerId;

        state.players.find(player => player.id === userId).hand = []

        payload.hand.forEach((tile) => {
            state.players.find(player => player.id === userId).hand.push({
                'shape': tile[0],
                'color': tile[1],
                'selected': false,
            })
        });
        
    },
    removeTileFromHand(state, { userId, tileIndex }) {
        state.players[userId].hand.splice(tileIndex, 1);
        console.log("hand:", state.players[userId].hand)
    },
    updateTilesAmount: (state, amount) => (state.deck.remaining = amount),

    updatePlayerScore: (state, {userId, amount}) => {
        // console.log(` userId: ${userId} with amount: ${amount}`);
        state.players[userId].score += amount;
    },
    setUsers: (state, users) => {
        state.users = users;
        console.log("blah blah")
    
        state.players.forEach((player, index) => {
            const user = users[index];
            if (user) {
                player.id = user.id;
                console.log("player has been set", player.id)
            } else {
                console.error("User not found for player at index:", index);
            }
        });
    },

};

export default {
    state,
    getters,
    actions,
    mutations
}
