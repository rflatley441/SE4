import axios from "axios";

const state = {
    game: false,
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
    playerHand: (state) => (id) => state.players[parseInt(id)].hand,
    deck: (state) => state.deck,
    pile: (state) => state.pile,
    gameOver: (state) => state.finished,
    winner: (state) => state.winner,
};

const actions = {
    async fetchDeck({commit}) {
        const response = await axios.get("http://127.0.0.1:5000/deck");
        commit('setDeck', response.data);
    },

    async fetchHand({commit, dispatch}) {
        const response = await axios.get("http://127.0.0.1:5000/playerhand");
        console.log(response.data);
        console.log(response.data[1]);
        response.data.forEach(item => {
            if (item.hand && item.userId) {
                commit('setHand', {
                    'playerId': item.userId,
                    'hand': item.hand
                });
            }
        })
        dispatch('updateTilesAmount', response.data[0].remaining);
    },

    updateTilesAmount({commit}, amount) {
        commit('updateTilesAmount', amount);
    },

    incrementRound({commit}) {
        commit('incrementRound');
    },

    randomStart({commit}) {
        let random = Math.round(Math.random());
        commit('setTurn', random);
    },

    // throwTile({commit, state}, userId) {
        
    // },

    gameStart({commit, dispatch}) {
        commit('restartGame');

        dispatch('fetchDeck').then(() =>{
            dispatch('fetchHand', 0);
            dispatch('fetchHand', 1);
            dispatch('randomStart');
        });
        commit('setGameStart', true);
    },

    drawTiles({commit}, userId) {
        commit('collectTiles', userId);
    },

    setGameOver({commit}, winner) {
        commit('gameOver', winner);
    }
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
        console.log(payload);
        let userId = payload.playerId;
        payload.hand.forEach((tile) => {
            state.players[userId].hand.push({
                'shape': tile[0],
                'color': tile[1]
            })
        });
        console.log(state.players[0].hand)
    },
    // throwTile: (state, userId) => {
        
    // },
    updateTilesAmount: (state, amount) => (state.deck.remaining = amount)
};

export default {
    state,
    getters,
    actions,
    mutations
}