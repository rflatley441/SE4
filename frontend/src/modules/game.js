import axios from "axios";

const state = {
    game: false,
    id: 0,
    round: 0,
    turn: null,
    winner: null,
    finished: false,

    players: [
        {
            name: 'player1',
            score: 0,
            hand: [],
        },
        {
            name: 'player2',
            score: 0,
            hand: [],
        }
    ],

    board: [],

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
    board: (state) => state.board,
    players: (state) => state.players,
    playerHand: (state) => (id) => state.players[parseInt(id)].hand,
    playerScore: (state) => (id) => state.players[parseInt(id)].score,
    deck: (state) => state.deck,
    pile: (state) => state.pile,
    gameOver: (state) => state.finished,
    winner: (state) => state.winner,
};

const actions = {
    updateGameState({commit}, gameState) {
        commit('updateGameState', gameState);
        console.log("game state updated", state)
    },
    async fetchDeck({commit}) {
        try {
            const response = await axios.get("http://127.0.0.1:5000/deck");
            commit('setDeck', response.data);
        } catch(error) {
            console.error(error.response.data)
        }
    },

    async fetchHand({commit, dispatch}) {
        try {
            const response = await axios.get("http://127.0.0.1:5000/playerhand");
            response.data.forEach(item => {
                if (item.hand && item.userId) {
                    commit('setHand', {
                        'playerId': item.userId,
                        'hand': item.hand
                    });
                }
            })
            dispatch('updateTilesAmount', response.data[0].remaining);
        } catch(error) {
            console.error(error.response.data)
        }
    },

    async updateHand({commit, state}, userId) {
        try {
            const response = await axios.post("http://127.0.0.1:5000/playerhand", {
                userId: userId,
                hand: state.players[userId].hand,
            });
            response.data.forEach(item => {
                if (item.hand && item.userId) {
                    commit('setHand', {
                        'playerId': item.userId,
                        'hand': item.hand
                    });
                }
            })
            console.log("update hand:", response)
        } catch (error) {
            console.error(error.response.data)
        }
    },

    updateBoard({commit}, board) {
        commit('updateBoard', board);
        console.log("board", state.board)
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
    gameStart({commit, dispatch}, roomId) {
        commit('restartGame');
        commit('initializeBoard');
        console.log("game started", roomId);
        commit('setGameId', roomId);

        dispatch('fetchDeck').then(() =>{
            dispatch('fetchHand', 0);
            dispatch('fetchHand', 1);
            dispatch('randomStart');
        });
        commit('setGameStart', true);
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
    setGameId: (state, id) => (state.id = id),
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
        state.players[userId].hand = []
        payload.hand.forEach((tile) => {
            state.players[userId].hand.push({
                'shape': tile[0],
                'color': tile[1],
                'selected': false,
            })
        });
        console.log(state.players[0].hand)
    },
    removeTileFromHand(state, { userId, tileIndex }) {
        state.players[userId].hand.splice(tileIndex, 1);
        console.log("hand:", state.players[userId].hand)
    },
    updateBoard: (state, board) => (state.board = board),
    updateTilesAmount: (state, amount) => (state.deck.remaining = amount),
    updateGameState: (state, gameState) => {
        for(let key in gameState['game']) {
            state[key] = gameState['game'][key];
        }
    },
    updatePlayerScore: (state, {userId, amount}) => {
        // console.log(` userId: ${userId} with amount: ${amount}`);
        state.players[userId].score += amount;
    }};

export default {
    state,
    getters,
    actions,
    mutations
}
