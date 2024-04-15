import { createStore } from 'vuex';
import game from '../src/modules/game.js'; 

describe('actions', () => {
    let store;
    beforeEach(() => {
        store = createStore({
          modules: {
            game: {
              ...game,
              state: {
                game: false,
                turn: null,
                round: 0,
                finished: false,
              },
            },
          },
        });
    });

    it('gets game status from game state', () => {
        const gameState = store.getters['gameState'];
        expect(gameState).toEqual({
          gameStatus: false,
          turn: null,
          round: 0,
          finished: false
        });
    });


    
    // it('gets turn from game state', () => {
    //     const gameState = store.getters['game/gameState'];
    //     expect(gameState.turn).toBeNull();
    // });
    
    // it('gets round from game state', () => {
    //     const gameState = store.getters['game/gameState'];
    //     expect(gameState.round).toEqual(0);
    // });
    
    // it('gets finished status from game state', () => {
    //     const gameState = store.getters['game/gameState'];
    //     expect(gameState.finished).toEqual(false);
    // });
    
    // it('updates tiles amount', () => {
    //     store.dispatch('updateTilesAmount', 5);
    //     expect(store.state.deck.remaining).toBe(5);
    // });
    
    // it('increments round', () => {
    //     store.dispatch('incrementRound', 0);
    //     expect(store.state.round).toBe(1);
    // });
    
    // it('sets turn', () => {
    //     store.dispatch('incrementRound', 0);
    //     expect(store.state.turn).toBe(0);
    // });

    // it('sums two numbers', () => {
    //     const result = game.sum(1, 2);
    //     expect(result).toBe(3);
    // });
});