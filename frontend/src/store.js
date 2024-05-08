import { createStore } from 'vuex';

import game from './modules/game.js';

const store = createStore({
    modules: {
        game,
    }
});

export default store 