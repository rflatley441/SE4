import { createStore } from "vuex";
import game from "../src/modules/game.js";

const axios = require('axios');
jest.mock('axios')

describe("actions", () => {
    let store;

    // testing game status

    it("gets game status from game state when game is in progress", () => {
        // creates a store with the game in progress
        store = createStore({
            modules: {
                game: {
                    ...game,
                    state: {
                        game: true,
                        turn: 1,
                        round: 1,
                        finished: false,
                    },
                },
            },
        });

        // getting the game state
        const gameState = store.getters["gameState"];
        // check to make sure the game is not finished
        expect(gameState.finished).toBe(false);
    });

    it("gets game status from game state when game is finished", () => {
        store = createStore({
            modules: {
                game: {
                    ...game,
                    state: {
                        game: false,
                        turn: 0,
                        round: 0,
                        finished: true,
                    },
                },
            },
        });

        const gameState = store.getters["gameState"];
        expect(gameState.finished).toBe(true);
    });

    // checking tiles logic

    it("updates tiles amount", async () => {
        // create a store with the game finished and no remaining tiles
        store = createStore({
            modules: {
                game: {
                    ...game,
                    state: {
                        game: false,
                        turn: 0,
                        round: 0,
                        finished: true,
                        deck: { remaining: 0 },
                    },
                },
            },
        });

        const amount = 10;
        // dispatch the updateTilesAmount action
        await store.dispatch("updateTilesAmount", amount);
        // check if the remaining tiles amount is updated
        expect(store.state.game.deck.remaining).toBe(amount);
    });

    it("updates tiles amount", async () => {
        // create a store with the game finished and no remaining tiles
        store = createStore({
            modules: {
                game: {
                    ...game,
                    state: {
                        game: false,
                        turn: 0,
                        round: 0,
                        finished: true,
                        deck: { remaining: 20 },
                    },
                },
            },
        });

        const amount = 5;
        // dispatch the updateTilesAmount action
        await store.dispatch("updateTilesAmount", amount);
        // check if the remaining tiles amount is updated
        expect(store.state.game.deck.remaining).toBe(amount);
    });

    // update tiles amount

    it("updates tiles amount with negative amount", async () => {
        const amount = -10;
        await store.dispatch("updateTilesAmount", amount);
        // remaining deck should not be negative 
        expect(store.state.game.deck.remaining).toBeGreaterThanOrEqual(0);
    });

    it("updates tiles amount with zero amount", async () => {
        const amount = 0;
        await store.dispatch("updateTilesAmount", amount);
        expect(store.state.game.deck.remaining).toBe(0);
    });

    it("updates tiles amount with large amount", async () => {
        const amount = 1000000;
        await store.dispatch("updateTilesAmount", amount);
        expect(store.state.game.deck.remaining).toBe(amount);
    });

    // testing incrementing the round

    it("increments round", async () => {
        // dispatch the incrementRound action
        await store.dispatch("incrementRound");
        // check if the round is incremented
        expect(store.state.game.round).toBe(1);
    });

    it("increments round twice", async () => {
        const initialRound = store.state.game.round;
        // dispatch the incrementRound action twice
        await store.dispatch("incrementRound");
        await store.dispatch("incrementRound");
        // check if the round is incremented twice
        expect(store.state.game.round).toBe(initialRound + 2);
    });

    // testing random start

    it("starts game with a random turn", async () => {
        await store.dispatch("randomStart");
        // the turn should either be 0 or 1
        expect([0, 1]).toContain(store.state.game.turn);
    });

    // testing turn logic

    it("sets turn", async () => {
        const userId = 1;
        // dispatch the incrementRound action
        await store.dispatch("incrementRound", userId);
        // check if the turn is set to the userId
        expect(store.state.game.turn).toBe(1);
    });

    it("sets turn after incrementing round twice", async () => {
        const userId0 = 0;
        const userId1 = 1;
        await store.dispatch("incrementRound", userId0);
        await store.dispatch("incrementRound", userId1);
        // check if the turn is set to the userId
        expect(store.state.game.turn).toBe(1);
    });

    // restarting the game

    it("restarts the game", async () => {
        // this line creates a mock function using jest. this mock function 
        // is used to replace the commit function that's normally used in 
        // vuex actions to mutate the state.
        const commit = jest.fn();
        const dispatch = jest.fn(() => Promise.resolve());

        // call the gameStart action
        await game.actions.gameStart({ commit, dispatch });

        // check if the restartGame mutation is committed
        expect(commit).toHaveBeenCalledWith("restartGame");
    });

    it("fetches the deck", async () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => Promise.resolve());

        await game.actions.gameStart({ commit, dispatch });

        expect(dispatch).toHaveBeenCalledWith("fetchDeck");
    });

    it("fetches the hands", async () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => Promise.resolve());

        await game.actions.gameStart({ commit, dispatch });

        expect(dispatch).toHaveBeenCalledWith("fetchHand", 0);
        expect(dispatch).toHaveBeenCalledWith("fetchHand", 1);
    });

    it("starts with a random turn", async () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => Promise.resolve());

        await game.actions.gameStart({ commit, dispatch });

        expect(dispatch).toHaveBeenCalledWith("randomStart");
    });

    it("sets the game start", async () => {
        const commit = jest.fn();
        const dispatch = jest.fn(() => Promise.resolve());

        await game.actions.gameStart({ commit, dispatch });

        expect(commit).toHaveBeenCalledWith("setGameStart", true);
    });

    // testing game over with winner

    it("sets game over with a winner", () => {
        const commit = jest.fn();
        const winner = "player1";

        game.actions.setGameOver({ commit }, winner);

        expect(commit).toHaveBeenCalledWith("gameOver", winner);
    });

    // testing fetch deck

    it('fetches deck successfully', async () => {
        const mockData = [{"deckId": 0}, {"remaining": 10}];
        axios.get.mockResolvedValue({data: mockData});

        const commit = jest.fn();

        await game.actions.fetchDeck({commit});

        expect(commit).toHaveBeenCalledWith('setDeck', mockData)
    });

    it('handles errors properly when fetching deck', async () => {
        const errorMessage = 'An error occured while fetching the game deck: '
        axios.get.mockRejectedValue({response: {data: errorMessage}});

        const commit = jest.fn()
        console.error = jest.fn()

        await game.actions.fetchDeck({ commit });

        expect(console.error).toHaveBeenCalledWith(errorMessage)
    });

    // testing fetch hand

    it('fetches player hand successfully', async () => {
      const mockData = [{"remaining": 10}, {"userId": 0}, {"hand": [{shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}]}];
      axios.get.mockResolvedValue({data: mockData});

      const commit = jest.fn();
      const dispatch = jest.fn(() => Promise.resolve());

      await game.actions.fetchHand({ commit, dispatch })

      mockData.forEach(item => {
        if (item.hand && item.userId) {
          expect(commit).toHaveBeenCalledWith('setHand', {
            playerId: item.userId,
            hand: item.hand
          });
        }
      });
    
  });
  
    it('dispatches update tiles amount correctly', async () => {
      const mockData = [{"remaining": 10}, {"userId": 0}, {"hand": [{shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}, {shape: 'square', color: '#00f', selected: false}]}];
      axios.get.mockResolvedValue({data: mockData});

      const commit = jest.fn();
      const dispatch = jest.fn(() => Promise.resolve());

      await game.actions.fetchHand({ commit, dispatch })

      expect(dispatch).toHaveBeenCalledWith('updateTilesAmount', mockData[0].remaining)
    });

    it('handles errors properly when fetching player hand', async () => {
        const errorMessage = 'An error occured while fetching the game deck: '
        axios.get.mockRejectedValue({response: {data: errorMessage}});

        const commit = jest.fn()
        const dispatch = jest.fn()
        console.error = jest.fn()

        await game.actions.fetchHand({ commit, dispatch });

        expect(console.error).toHaveBeenCalledWith(errorMessage)
    });

    // testing update hand
    it('posts hand successfully', async () => {
        const userId = 0;
        const mockState = {
          players: {
            [userId]: {
              hand: [
                  { shape: 'square', color: '#00f', selected: false },
                  { shape: 'square', color: '#00f', selected: false }
              ]
            }
          }
        };

        const mockResponseData = [
          { userId: 0, hand: [{ shape: 'circle', color: '#f00', selected: false}, { shape: 'circle', color: '#f00', selected: false}]}
        ];

        axios.post.mockResolvedValue({ data: mockResponseData });

        const commit = jest.fn();

        await game.actions.updateHand({ commit, state: mockState}, userId);

        expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/playerhand', { userId, hand: mockState.players[userId].hand})
    });

    it('updates hand successfully', async () => {
      const userId = 0;
      const mockState = {
        players: {
          [userId]: {
            hand: [
                { shape: 'square', color: '#00f', selected: false },
                { shape: 'square', color: '#00f', selected: false }
            ]
          }
        }
      };

      const mockResponseData = [
        { userId: 0, hand: [{ shape: 'circle', color: '#f00', selected: false}, { shape: 'circle', color: '#f00', selected: false}]}
      ];

      axios.post.mockResolvedValue({ data: mockResponseData });

      const commit = jest.fn();

      await game.actions.updateHand({ commit, state: mockState}, userId);

      mockResponseData.forEach(item => {
        if (item.hand && item.userId) {
          expect(commit).toHaveBeenCalledWith('setHand', {
            playerId: item.userId,
            hand: item.hand
          });
        }
      });
  });

  it('handles errors successfully when updating hand', async () => {
    const userId = 0;
    const mockState = {
      players: {
        [userId]: {
          hand: [
              { shape: 'square', color: '#00f', selected: false },
              { shape: 'square', color: '#00f', selected: false }
          ]
        }
      }
    };

    const errorMessage = 'An error occured while updating the player hand: '
    axios.post.mockRejectedValue({response: {data: errorMessage}});

    const commit = jest.fn();
    console.error = jest.fn();

    await game.actions.updateHand({ commit, state: mockState}, userId);

    expect(console.error).toHaveBeenCalledWith(errorMessage)
});

    // testing update player score
    it('posts player score successfully', async () => {
        const userId = 0;
        const mockState = {
          players: {
            [userId]: {
              score: 10,
              hand: [
                  { shape: 'square', color: '#00f', selected: false },
                  { shape: 'square', color: '#00f', selected: false }
              ]
            }
          }
        };

        const mockResponseData = [
          { userId: 0, score: 10}
        ];

        axios.post.mockResolvedValue({ data: mockResponseData });

        await game.actions.updatePlayerScore({state: mockState}, userId);

        expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/playerscore', { userId, score: mockState.players[userId].score})
    });

    it('handles errors successfully when updating player score', async () => {
      const userId = 0;
      const mockState = {
        players: {
          [userId]: {
            score: 10,
            hand: [
                { shape: 'square', color: '#00f', selected: false },
                { shape: 'square', color: '#00f', selected: false }
            ]
          }
        }
      };

      const mockResponseData = [
        { userId: 0, score: 10}
      ];

      const errorMessage = 'An error occured while updating the player score: '
      axios.post.mockRejectedValue({response: {data: errorMessage}});

      console.error = jest.fn();

      await game.actions.updatePlayerScore({ state: mockState}, userId);
  
      expect(console.error).toHaveBeenCalledWith(errorMessage)
  });

  // testing set hand
    it('correctly sets player hand with addition to hand', () => {
      const userId = 0;
      store = createStore({
        modules: {
            game: {
                ...game,
                state: {
                    game: false,
                    turn: 0,
                    round: 0,
                    finished: false,
                    players: {
                      [userId]: {
                          name: 'player1',
                          score: 0,
                          hand: [],
                      }
                    },
                },
            },
        },
    });

    const payload = {
      playerId: userId,
      hand: [['circle', '#f00'], ['circle', '#f00'], ['circle', '#f00']]
    };
      store.commit("setHand", payload);

      const expectedHand = [{shape: 'circle', color: '#f00', selected: false}, {shape: 'circle', color: '#f00', selected: false}, {shape: 'circle', color: '#f00', selected: false}]

      const expectedHandJSON = JSON.stringify(expectedHand);
      const receivedHandJSON = JSON.stringify(store.state.game.players[userId].hand);

      expect(receivedHandJSON).toEqual(expectedHandJSON);
    });

    it('correctly sets player hand with no addition to hand', () => {
      const userId = 0;
      store = createStore({
        modules: {
            game: {
                ...game,
                state: {
                    game: false,
                    turn: 0,
                    round: 0,
                    finished: false,
                    players: {
                      [userId]: {
                          name: 'player1',
                          score: 0,
                          hand: [],
                      }
                    },
                },
            },
        },
    });

    const payload = {
      playerId: userId,
      hand: []
    };
      store.commit("setHand", payload);

      const expectedHand = []

      const expectedHandJSON = JSON.stringify(expectedHand);
      const receivedHandJSON = JSON.stringify(store.state.game.players[userId].hand);

      expect(receivedHandJSON).toEqual(expectedHandJSON);
    });

    // testing remove tile from hand
    it('correctly removes tile from hand at the front of hand', () => {
      const userId = 0;
      store = createStore({
        modules: {
            game: {
                ...game,
                state: {
                    game: false,
                    turn: 0,
                    round: 0,
                    finished: false,
                    players: {
                      [userId]: {
                          name: 'player1',
                          score: 0,
                          hand:  [['square', '#f00'], ['clover', '#f00'], ['diamond', '#f00'], ['circle', '#f00']],
                      }
                    },
                },
            },
        },
    });

    const tileIndex = 0;
      store.commit("removeTileFromHand", {userId, tileIndex});

      const expectedHand = [['clover', '#f00'], ['diamond', '#f00'], ['circle', '#f00']]

      const expectedHandJSON = JSON.stringify(expectedHand);
      const receivedHandJSON = JSON.stringify(store.state.game.players[userId].hand);

      expect(receivedHandJSON).toEqual(expectedHandJSON);
    });

    it('correctly removes tile from hand at the end of hand', () => {
      const userId = 0;
      store = createStore({
        modules: {
            game: {
                ...game,
                state: {
                    game: false,
                    turn: 0,
                    round: 0,
                    finished: false,
                    players: {
                      [userId]: {
                          name: 'player1',
                          score: 0,
                          hand:  [['square', '#f00'], ['clover', '#f00'], ['diamond', '#f00'], ['circle', '#f00']],
                      }
                    },
                },
            },
        },
    });

    const tileIndex = 3;
      store.commit("removeTileFromHand", {userId, tileIndex});

      const expectedHand = [['square', '#f00'], ['clover', '#f00'], ['diamond', '#f00']]

      const expectedHandJSON = JSON.stringify(expectedHand);
      const receivedHandJSON = JSON.stringify(store.state.game.players[userId].hand);

      expect(receivedHandJSON).toEqual(expectedHandJSON);
    });

    it('correctly removes tile from hand in the middle of hand', () => {
      const userId = 0;
      store = createStore({
        modules: {
            game: {
                ...game,
                state: {
                    game: false,
                    turn: 0,
                    round: 0,
                    finished: false,
                    players: {
                      [userId]: {
                          name: 'player1',
                          score: 0,
                          hand:  [['square', '#f00'], ['clover', '#f00'], ['diamond', '#f00'], ['circle', '#f00']],
                      }
                    },
                },
            },
        },
    });

    const tileIndex = 1;
      store.commit("removeTileFromHand", {userId, tileIndex});

      const expectedHand = [['square', '#f00'], ['diamond', '#f00'], ['circle', '#f00']]

      const expectedHandJSON = JSON.stringify(expectedHand);
      const receivedHandJSON = JSON.stringify(store.state.game.players[userId].hand);

      expect(receivedHandJSON).toEqual(expectedHandJSON);
    });

    it('correctly does nothing if tile index is out of bounds', () => {
      const userId = 0;
      store = createStore({
        modules: {
            game: {
                ...game,
                state: {
                    game: false,
                    turn: 0,
                    round: 0,
                    finished: false,
                    players: {
                      [userId]: {
                          name: 'player1',
                          score: 0,
                          hand:  [['square', '#f00'], ['clover', '#f00'], ['diamond', '#f00'], ['circle', '#f00']],
                      }
                    },
                },
            },
        },
    });

    const tileIndex = 5;
      store.commit("removeTileFromHand", {userId, tileIndex});

      const expectedHand = [['square', '#f00'], ['clover', '#f00'], ['diamond', '#f00'], ['circle', '#f00']]

      const expectedHandJSON = JSON.stringify(expectedHand);
      const receivedHandJSON = JSON.stringify(store.state.game.players[userId].hand);

      expect(receivedHandJSON).toEqual(expectedHandJSON);
    });
});
