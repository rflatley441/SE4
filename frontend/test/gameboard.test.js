import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import GameBoard from '../src/components/GameBoard.vue';
import gameModule from '../src/modules/game'; // Adjust this path to your actual game module path

describe('GameBoard', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = createStore({
          modules: {
            game: gameModule
          }
        });

        wrapper = mount(GameBoard, {
          global: {
            plugins: [store],
            stubs: ['BoardTile'] // Stub out child components if necessary
          },
          props: {
            userId: 0,
            playerHand: [],
          }
        });
    });

    // Test to check if the component renders
    it('renders correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    // Test to check for a specific element or class within the component
    it('contains the game-board-container', () => {
        expect(wrapper.html()).toContain('game-board-container');
    });

    // Test to simulate the end turn action and check the state change
    it('updates state on end turn', async () => {
        // Trigger the end turn action
        await wrapper.find('.end-turn-button').trigger('click');
        // Check the expected state change
        expect(store.state.game.turn).not.toBeNull();
    });

    // This test should be moved inside the describe block
    it('gets game status from game state', () => {
        const gameState = store.getters['game/gameState']; // Make sure to access it with the correct namespace
        expect(gameState).toEqual({
          gameStatus: false,
          turn: null,
          round: 0,
          finished: false
        });
    });

    // Additional tests can also be added here...
});
