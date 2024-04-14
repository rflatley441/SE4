import { createStore } from 'vuex';
import game from '../src/modules/game';

describe('actions', () => {
    let store;
    beforeEach(() => {
        const storeConfig = {
            modules: {
                game,
            }
        };
        store = createStore(storeConfig);
    });

    it('gets game state', () => {
        const gameState = store.getters['game/gameState'];
        expect(gameState).toEqual({
            gameStatus: false,
            turn: null,
            round: 0,
            finished: false
        });
    });

    it('updates tiles amount', () => {
        store.dispatch('updateTilesAmount', 5);
        expect(store.state.deck.remaining).toBe(5);
    });

    it('increments round and sets turn', () => {
        store.dispatch('incrementRound', 0);
        expect(store.state.round).toBe(1);
        expect(store.state.turn).toBe(0);
    });

    it('sets random start', () => {
        store.dispatch('randomStart');
        expect([0, 1]).toContain(store.state.turn);
    });

    it('sets game over', () => {
        store.dispatch('setGameOver', 'player1');
        expect(store.state.finished).toBe(true);
        expect(store.state.winner).toBe('player1');
    });
});