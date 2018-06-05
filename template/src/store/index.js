import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import user from "./modules/User";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    state: {
        isOnline: true
    },
    modules: {
        user: user,
    },
    mutations: {
        updateOnlineStatus(state, isOnline) {
            state.isOnline = isOnline;
        },
    },
    actions: {
        saveOnlineStatus(context, isOnline) {
            context.commit('updateOnlineStatus', isOnline);
        },
    },
    getters: {
        isOnline(state) {
            return state.isOnline;
        }
    },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;