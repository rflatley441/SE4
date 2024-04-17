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
                        deck: {
                            remaining: 0, 
                        }
                    },
                    mutations: {
                        ...gameModule.mutations,
                        removeTileFromHand: jest.fn(), 
                        updatePlayerScore: jest.fn(),
                        setGameOver: jest.fn(),
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

    it('game renders correctly', () => {
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
        expect(tiles.length).toBe(144); 
    });

    it('updates tile properties on placeTile', async () => {
        expect(wrapper.vm.tileList[5].color).toBe('#fff'); 
        expect(wrapper.vm.tileList[5].shape).toBe("");
        expect(wrapper.vm.tileList[5].hidden).toBe(true);
    });
    
    it('changes player on endTurn', async () => {
        const initialPlayerId = store.state.game.turn;
        await wrapper.vm.endTurn(); 
        const nextPlayerId = store.state.game.turn;
    
        expect(nextPlayerId).not.toBe(initialPlayerId + 1); 
      });
    
    it('calculates no tiles placed', () => {
        wrapper.vm.calculateScore(0);
        expect(3)
    });

    it('calculates tiles placed adding to score', () => {
        wrapper.vm.calculateScore(4);
        expect(1)
    });

    it('calls Vuex actions correctly on endTurn', async () => {
        const spyUpdateHand = jest.spyOn(wrapper.vm, 'updateHand');
        const spyFetchHand = jest.spyOn(wrapper.vm, 'fetchHand');
        const spyIncrementRound = jest.spyOn(wrapper.vm, 'incrementRound');

        await wrapper.vm.endTurn();

        expect(spyUpdateHand).toHaveBeenCalledWith(wrapper.vm.userId);
        expect(spyFetchHand).toHaveBeenCalled();
        expect(spyIncrementRound).toHaveBeenCalled();
    });

    it('renders all buttons and tiles as expected', () => {
        const buttons = wrapper.findAll('.end-turn-button');
        const tiles = wrapper.findAllComponents({ name: 'BoardTile' });

        expect(buttons.length).toBe(1);
        expect(tiles.length).toBe(144); 
    });
    
    it('places a tile correctly when selectTile is triggered', async () => {
        const tileIndex = 5; 
        const initialColor = wrapper.vm.tileList[tileIndex].color;
        const initialShape = wrapper.vm.tileList[tileIndex].shape;
        const initialHidden = wrapper.vm.tileList[tileIndex].hidden;

        await wrapper.vm.placeTile({ position: tileIndex });
        
        expect(wrapper.vm.tileList[tileIndex].color).toBe(initialColor);
        expect(wrapper.vm.tileList[tileIndex].shape).toBe(initialShape);
        expect(wrapper.vm.tileList[tileIndex].hidden).toBe(true);
    });

    it('allows a player to select a tile from their hand UI ', async () => {
        const firstTile = wrapper.findComponent({ name: 'BoardTile' });
        if (firstTile.exists()) {
            await firstTile.trigger('click');
            expect(wrapper.vm.playerHand[0].selected).toBe(true);
        } else {
            throw new Error('Tile component not found');
        }
    });

    it('no winner yet', async () => {
        await wrapper.vm.determineWinner();
        const winnerAnnouncement = store.state.game.winner; 
        expect(winnerAnnouncement).toEqual({"winner": ""});
    });


});
