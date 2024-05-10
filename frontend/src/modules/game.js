import axios from "axios";
import { db } from '@/services/firebase.js'; 
import { collection, getDocs } from 'firebase/firestore';

// import { collection, getDocs } from 'firebase/firestore';


const state = {
    game: false,
    id: 0,
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
            id: "0",
        },
        {
            name: 'player2',
            score: 0,
            hand: [],
            id: "1",
        }
    ],

    board: [],
    tilesPlayed: [],

    deck: {
        deck_id: null,
        remaining: null,
    },
};

const getters = {
    gameState: (state) => {
        return {
            gameStatus: state.game,
            id: state.id,
            turn: state.turn,
            round: state.round,
            finished: state.finished
        };
    },
    tilesPlayed: (state) => state.tilesPlayed,
    board: (state) => state.board,
    players: (state) => state.players,
    playerHand: (state) => (id) => {
        return state.players.find(player => player.id === id)?.hand || [];
    },
    playerScore: (state) => (id) => state.players.find(player => player.id === id)?.score || 0,
    deck: (state) => state.deck,
    pile: (state) => state.pile,
    gameOver: (state) => state.finished,
    winner: (state) => state.winner,
    users: state => state.users, // accessing users to get their ids
};

const actions = {
    updateGameState({commit}, gameState) {
        commit('updateGameState', gameState);
    },
    async fetchDeck({commit}) {
        try {
            const response = await axios.get("http://127.0.0.1:5000/deck");
            commit('setDeck', response.data);
        } catch(error) {
            console.error(error.response.data)
        }
    },

    async fetchUsers({ commit, state }) {
        const gameCode = state.id; 
        console.log("Fetching users with specific game code:", gameCode);
        try {
            const gamesCollectionRef = collection(db, 'games');
            const gamesQuerySnapshot = await getDocs(gamesCollectionRef);
            
            // Checks if the game exists and if the user can join
            gamesQuerySnapshot.forEach(async (doc) => {
            const gameData = doc.data();
            if (gameData.gameCode === gameCode) {
                console.log("game found")
                const players = gameData.players;
                commit('setUsers', players);
            }});
        } catch (error) {
            console.error("Error fetching users with specific game code:", error);
        }
    },

    async fetchHand({ commit, dispatch, state }, playerId) {
        let user = null;
        state.players.forEach((player) => {
            if (player.id === playerId) {
                user = player;
            }
        });
        if (user) {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/playerhand`);

                const playersData = response.data.slice(1); // cuts out the remaining tiles info as isnt needed for fetchHand
                for (const playerData of playersData) {
                    const playerId = playerData.userId; 
                    const hand = playerData.hand;
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
                    // Check if both item.userId and item.hand are defined before committing
                    if (item.hand && item.userId) {
                        commit('setHand', {
                            playerId: item.userId,
                            hand: item.hand
                        });
                    } else {
                        // Log when the data is undefined and therefore not committed
                        console.log("Skipped updating due to undefined item or hand for userId:", item.userId);
                    }
                });
    
            } catch (error) {
                console.error("Error updating hand for player:", userId, ";", error.response ? error.response.data : error.message);
            }
        } else {
            console.error("Player not found with userId:", userId);
        }
    },

    updateBoard({commit}, board) {
        commit('updateBoard', board);
    },

    updateTilesPlayed({commit}, tilesPlayed){
        commit('updateTilesPlayed', tilesPlayed);
        console.log("tiles played", state.tilesPlayed)
    },
    
    updateTilesAmount({commit}, amount) {
        commit('updateTilesAmount', amount);
    },

    incrementRound({commit}, userId) {
        commit('incrementRound');
        commit('setTurn', userId);
    },

    randomStart({commit}) {
        // let random = Math.round(Math.random());
        commit('setTurn', 0);
    },
    async gameStart({commit, dispatch}, data) {
        commit('restartGame');
        commit('initializeBoard');
        console.log("gameStart", data['room']);
        commit('setGameId', data['room']);
        // dispatch('fetchUsers');
        commit('setUsers', data['players']);

        const player1Id = data['players'][0]['userId'];
        const player2Id = data['players'][1]['userId'];

        // console.log("player1Id", player1Id);
        // console.log("player2Id", player2Id);

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
    setGameId: (state, id) => {state.id = id;},
    initializeBoard: (state) => {
        state.board = [];
        for (let i = 0; i < 144; i++) {
            state.board.push({
                value: i,
                highlighted: false,
                hidden: true,
                color: '#fff',
                shape: '',
                position: i,
            })
        }
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
            });
        });        
    },
    removeTileFromHand(state, { userId, tileIndex }) {
        state.players[userId].hand.splice(tileIndex, 1);
    },
    updateBoard: (state, board) => (state.board = board),
    updateTilesPlayed: (state, tilesPlayed) => (state.tilesPlayed = tilesPlayed),
    updateTilesAmount: (state, amount) => (state.deck.remaining = amount),
    updateGameState: (state, gameState) => {
        for(let key in gameState['game']) {
            state[key] = gameState['game'][key];
        }
        console.log(state)
    },
    updatePlayerScore: (state, {userId, amount}) => {
        state.players[userId].score += amount;
    },
    setUsers: (state, users) => {
        state.users = users;
        state.players.forEach((player, index) => {
            const user = users[index];
            if (user) {
                player.id = user['userId'];
                player.name = user['username'];
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
