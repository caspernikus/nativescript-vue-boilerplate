import Vue from 'nativescript-vue';

import { isIOS } from 'tns-core-modules/platform';

import VueGettext from 'vue-gettext';
import Translations from './locale/locales.json';

Vue.use(VueGettext, {
    translations: Translations,
    availableLanguages: {
        en_US: 'English',
        de_DE: 'Deutsch'
    },
    silent: true,
    defaultLanguage: 'de_DE'
});

import ApiService from './services/ApiService';
import NetworkService from './services/NetworkService';
import LoggerService from './services/LoggerService';

const network = new NetworkService();

/**
 * Create a Vue Modules containing all helpers
 * We are able to access these helpers in all Vue Instances with 'this.$app'
 * 
 * @type {Object}
 */
Vue.prototype.$app = Object.freeze({
    network,
    api: new ApiService(network),
    isIOS: (isIOS) ? true : false
});

/**
 * Create a Vue Module containing our Logger
 * @type {LoggerService}
 */
Vue.prototype.Logger = new LoggerService();

import store from './store';

/**
 * Initially dispatch and load the network status.
 * Also listen on emitted events of NetworkService to update our App State.
 */
store.dispatch('saveOnlineStatus', network.isOnline);
network.on('networkStatusChanged', function(event) {
    const isOnline = event.object.isOnline;
    
    store.dispatch('saveOnlineStatus', isOnline);
});

import Login from './components/Login';
import Home from './components/Home';

// Script determination
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
