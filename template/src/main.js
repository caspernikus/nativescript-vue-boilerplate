import Vue from 'nativescript-vue';

import ApiService from '../services/ApiService';
import NetworkService from './services/NetworkService';
import LoggerService from './services/LoggerService';

const network = new NetworkService();
Vue.prototype.$app = Object.freeze({
    network,
    api: new ApiService(network),
});

Vue.prototype.Logger = new LoggerService();

import store from './store';

store.dispatch('saveOnlineStatus', network.isOnline);
network.on('networkStatusChanged', function(event) {
    const isOnline = event.object.isOnline;
    
    store.dispatch('saveOnlineStatus', isOnline);
});

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
