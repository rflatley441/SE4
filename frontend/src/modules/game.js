import axios from "axios";
import { db } from '@/services/firebase.js'; // Adjust path as necessary
import { collection, getDocs } from 'firebase/firestore';

const state = {
    game: false,
    round: 0,
    turn: null,
    winner: null,
    finished: false,
    players: [], // Players are dynamically loaded from Firebase
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
    gameState: state => ({
        gameStatus: state.game,
        turn: state.turn,
        round: state.round,
        finished: state.finished
    }),
    players: state => state.players,
    playerHand: state => id => {
        const player = state.players.find(p => p.id === id);
        return player ? player.hand : [];
    },
    playerScore: state => id => {
        const player = state.players.find(p => p.id === id);
        return player ? player.score : 0;
    },
    deck: state => state.deck,
    pile: state => state.pile,
    gameOver: state => state.finished,
    winner: state => state.winner,
};

const actions = {
    async fetchDeck({ commit }) {
        try {
            const response = await axios.get("http://127.0.0.1:5000/deck");
            commit('setDeck', response.data);
        } catch (error) {
            console.error(error.response.data);
        }
    },

    async fetchPlayers({ commit }) {
        const playersCollection = collection(db, "users");
        try {
            const snapshot = await getDocs(playersCollection);
            const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), hand: [], score: 0 }));
            commit('setPlayers', players);
        } catch (error) {
            console.error("Failed to fetch players:", error);
        }
    },

    async fetchHand({ commit }, playerId) {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/playerhand/${playerId}`);
            if (response.data.hand) {
                commit('setHand', { playerId, hand: response.data.hand });
            }
        } catch (error) {
            console.error('Failed to fetch hand for player:', playerId, '; Error:', error.response.data);
            // Optionally, handle the error in a user-friendly way, e.g., showing a message on the UI
        }
    },

    async updateHand({ commit, state }, userId) {
        const player = state.players.find(p => p.id === userId);
        if (player) {
            const response = await axios.post("http://127.0.0.1:5000/playerhand", {
                userId: userId,
                hand: player.hand,
            });
            if (response.data.hand) {
                commit('setHand', { playerId: userId, hand: response.data.hand });
            }
        }
    },

    incrementRound({ commit }, userId) {
        commit('incrementRound');
        commit('setTurn', userId);
    },

    gameStart({ commit, dispatch }) {
        commit('restartGame');
        dispatch('fetchDeck').then(() => {
            dispatch('fetchPlayers').then(() => {
                let randomPlayerId = state.players[Math.floor(Math.random() * state.players.length)].id;
                commit('setTurn', randomPlayerId);
                state.players.forEach(player => {
                    dispatch('fetchHand', player.id);
                });
            });
        });
        commit('setGameStart', true);
    },

    setGameOver({ commit }, winner) {
        commit('gameOver', winner);
    },

    updatePlayerScore({ commit }, { userId, amount }) {
        commit('updatePlayerScore', { userId, amount });
    },
};

const mutations = {
    restartGame(state) {
        state.finished = false;
        state.round = 0;
        state.winner = null;
        state.players.forEach(player => {
            player.hand = [];
        });
        state.pile = [{ tile: null }, { tile: null }];
    },
    setGameStart(state, value) {
        state.game = value;
    },
    setTurn(state, userId) {
        state.turn = userId;
    },
    gameOver(state, winner) {
        state.winner = winner;
        state.finished = true;
    },
    incrementRound(state) {
        state.round++;
    },
    setDeck(state, deck) {
        state.deck.deck_id = deck.id;
        state.deck.remaining = deck.remaining;
    },
    setHand(state, { playerId, hand }) {
        const player = state.players.find(p => p.id === playerId);
        if (player) {
            player.hand = hand.map(tile => ({
                shape: tile[0],
                color: tile[1],
                selected: false,
            }));
        }
    },
    setPlayers(state, players) {
        state.players = players;
    },
    updatePlayerScore(state, { userId, amount }) {
        const player = state.players.find(p => p.id === userId);
        if (player) {
            player.score += amount;
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
