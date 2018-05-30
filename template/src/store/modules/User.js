import * as applicationSettings from "tns-core-modules/application-settings";

export default {
    namespaced: true,
    state: {
        apiToken: applicationSettings.getString('apiToken'),
        userData: applicationSettings.getString('userData'),
    },
    mutations: {
        updateToken(state) {
            state.apiToken = applicationSettings.getString('apiToken');
        },
        updateUserData(state) {
            state.userData = applicationSettings.getString('userData');
        }
    },
    actions: {
        saveToken(context, apiToken) {
            applicationSettings.setString('apiToken', apiToken);
            context.commit('updateToken');
        },
        saveUserData(context, userData) {
            applicationSettings.setString('userData', JSON.stringify(userData));
            context.commit('updateUserData');
        },
        logout(context) {
            applicationSettings.setString('userData', '');
            applicationSettings.setString('apiToken', '');

            context.commit('updateToken');
            context.commit('updateUserData');
        }
    },
    getters: {
        getUserData(state) {
            const rawData = state.userData;

            if (rawData === undefined || rawData.length === 0) {
                return null;
            }

            return JSON.parse(rawData);
        },
        isLoggedIn(state) {
            if (!state.apiToken) {
                return false;
            }

            return state.apiToken.length > 0;
        },
        getApiToken(state) {
            return state.apiToken;
        },
        getApiHeaders(state, getters) {
            var headers = {
                "Content-Type": "application/json",
            };

            if (getters.isLoggedIn) {
                headers['APITOKEN'] = getters.getApiToken;
            }

            return headers;
        }
    }
}