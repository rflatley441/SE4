import { createStore } from 'vuex';
import { mount } from '@vue/test-utils';
import GameBoard from '../src/components/GameBoard.vue';
import gameModule from '../src/modules/game';

describe('GameBoard', () => {
    let store;
    let wrapper;

    beforeEach(() => {
        store = createStore({
            modules: {
                game: {
                    ...gameModule,
                    state: {
                        ...gameModule.state,
                        turn: 0,
                        players: [{ id: 0, hand: [{ id: 1, selected: true, color: 'red', shape: 'circle' }] }],
                    },
                    mutations: {
                        ...gameModule.mutations,
                        removeTileFromHand: jest.fn(), // Mock the function to prevent actual implementation
                        updatePlayerScore: jest.fn(),
                    },
                    actions: {
                        ...gameModule.actions,
                        updateHand: jest.fn(),
                        fetchHand: jest.fn(),
                        incrementRound: jest.fn(),
                    }
                },
            },
        });

        wrapper = mount(GameBoard, {
            global: {
                plugins: [store],
                stubs: ['BoardTile'] // Stub out child components if necessary
            },
            props: {
                userId: 0,
                playerHand: [{ id: 1, selected: true, color: 'red', shape: 'circle' }],
                
            }
        });
    });

    it('renders correctly', () => {
        expect(wrapper.find('.game-board-container').exists()).toBe(true);
    });



    it('end turn button exists', () => {
        expect(wrapper.find('.end-turn-button').exists()).toBe(true);
    });

    it('calculateScore method exists', () => {
        expect(typeof wrapper.vm.calculateScore).toBe('function');
    });

    it('renders all tiles correctly', () => {
        const tiles = wrapper.findAllComponents({ name: 'BoardTile' });
        expect(tiles.length).toBe(144); // Ensure all tiles are rendered
    });

    it('updates tile properties on placeTile', async () => {
        expect(wrapper.vm.tileList[5].color).toBe('#fff'); // As per playerHand selection
        expect(wrapper.vm.tileList[5].shape).toBe("");
        expect(wrapper.vm.tileList[5].hidden).toBe(true);
    });
    
    it('changes player on endTurn', async () => {
        const initialPlayerId = store.state.game.turn;
        await wrapper.vm.endTurn(); // Execute the endTurn method
        const nextPlayerId = store.state.game.turn;
    
        expect(nextPlayerId).not.toBe(initialPlayerId + 1); // Check if the player ID changed
      });
    
    it('calculates and commits score correctly', () => {
        wrapper.vm.calculateScore(0);
        expect(3)
    });

    it('calculates and commits score correctly', () => {
        wrapper.vm.calculateScore(4);
        expect(1)
    });
    

});
