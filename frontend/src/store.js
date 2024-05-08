import { createStore } from 'vuex';

import game from './modules/game.js';

const store = createStore({
    modules: {
        game,
    }
});

window.addEventListener('beforeunload', () => {
    store.dispatch('game/saveGameState'); // Dispatch the saveGameState action from the game module
  });

export default store 