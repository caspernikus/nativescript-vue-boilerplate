import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import user from "./modules/User";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    user: user,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;