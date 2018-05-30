import Vue from 'nativescript-vue';

import store from './store';

import Login from './components/Login';
import Home from './components/Home';

import './styles.less'

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(store.getters['user/isLoggedIn'] ? Home : Login),

  store,

}).$start();
