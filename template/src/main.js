import Vue from 'nativescript-vue';

import store from './store';

import . from './styles.less'

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(store.getters['user/isLoggedIn'] ? Home : Login),

  store,

}).$start();
