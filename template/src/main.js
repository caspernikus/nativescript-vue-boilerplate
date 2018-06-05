import Vue from 'nativescript-vue';

import ApiService from '../services/ApiService';

Vue.prototype.$app = Object.freeze({
    api: new ApiService()
});

import store from './store';

import Login from './components/Login';
import Home from './components/Home';

{{#if_eq style_lang "less"}}
import './styles.less'
{{/if_eq}}

{{#if_eq style_lang "scss"}}
import './styles.scss'
{{/if_eq}}

// Uncommment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(store.getters['user/isLoggedIn'] ? Home : Login),

  store,

}).$start();
