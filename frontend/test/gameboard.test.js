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

    // Test to check for a specific element or class within the component
    it('contains the game-board-container', () => {
        expect(wrapper.html()).toContain('game-board-container');
    });

/*     // Test to simulate the end turn action and check the state change
    it('calls endTurn method on button click', async () => {
        // Spy on the endTurn method
        const endTurnSpy = jest.spyOn(wrapper.vm, 'endTurn');

        // Trigger the button click
        await wrapper.find('.end-turn-button').trigger('click');

        // Assert that endTurn was called
        expect(endTurnSpy).toHaveBeenCalled();
    }); */

});
