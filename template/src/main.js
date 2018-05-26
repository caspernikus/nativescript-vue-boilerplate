import Vue from 'nativescript-vue';

import store from './store';

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(),

  store,

}).$start();
