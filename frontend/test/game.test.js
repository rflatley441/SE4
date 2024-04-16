import { createStore } from "vuex";
import game from "../src/modules/game.js";

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
});
