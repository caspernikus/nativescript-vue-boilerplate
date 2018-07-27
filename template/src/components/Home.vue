<template>
    <Page class='home' actionBarHidden='true' backgroundSpanUnderStatusBar='true' enableSwipeBackNavigation='false'>
        <NavigationButton visibility='collapsed' justifyContent='space-between' alignContent='space-between' />
        <DockLayout stretchLastChild='false'>
            <StackLayout class='home-controller' dock='top'>
                <Image src='~/images/logo.png' stretch='aspectFit' horizontalAlignment='center' class='logo' />

                <Label text='Hello,' horizontalAlignment='center' />
                <Label horizontalAlignment='center' :text='name'></Label>
                <Label horizontalAlignment='center' :text='isOnline'></Label>

                <Image :src='avatar' stretch='aspectFit' horizontalAlignment='center' class='logo' />

                <Label fontSize='20' horizontalAlignment='center' :text='localization("example.localized")'/>
                <Label horizontalAlignment='center' text='Switch language'/>
                <Switch v-model="engActive" @checkedChange="switchLang" />

                <Label fontSize='20' marginTop='20' horizontalAlignment='center' text='Log Outputs'/>
                <GridLayout columns="*, *, *, *" rows="40">
                    <Button col='0' text='Log' @tap='log()' />
                    <Button col='1' text='Info' @tap='info()' />
                    <Button col='2' text='Warn' @tap='warn()' />
                    <Button col='3' text='Error' @tap='error()' />
                </GridLayout>
            </StackLayout>

            <Button
                text='Logout'
                class='logout-button'
                dock='bottom'
                @tap='logout()' />
        </DockLayout>
    </Page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import Login from './Login.vue';

    export default {
        data() {
            return {
                engActive: false
            }
        },
        computed: {
            ...mapGetters({
                getUserData: 'user/getUserData',
                getApiHeaders: 'user/getApiHeaders',
                getNetworkStatus: 'isOnline',
            }),

            name() {
                if (!this.user) {
                    return '';
                }

                return this.user.first_name + ' ' + this.user.last_name;
            },

            avatar() {
                if (!this.user) {
                    return '';
                }

                return this.user.avatar;
            },

            user() {
                return this.getUserData;
            },

            isOnline() {
                return 'Is Online: ' + this.getNetworkStatus;
            }
        },
        beforeMount() {
            this.$app.api.setHeader(this.getApiHeaders);

            this.$app.api.get('users/2').then((response) => {
                const user = response.data;

                this.saveUserData(user);
            }).catch((error) => {
                this.Logger.error(error);
            });
        },
        methods: {
            ...mapActions({
                userLogout: 'user/logout',
                saveUserData: 'user/saveUserData',
                saveToken: 'user/saveToken',
            }),

            logout() {
                this.userLogout();

                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },

            log() {
                this.Logger.log('Log Output');
            },

            info() {
                this.Logger.info('Info Output');
            },

            warn() {
                this.Logger.warn('Warn Output');
            },

            error() {
                this.Logger.error('Error Output');
            },

            switchLang() {
                this.$language.current = (this.engActive) ? 'en_US' : 'de_DE';
            },

            localization(type) {
                switch (type) {
                    case 'example.localized':
                        return this.$gettext('example.localized');
                    default:
                        break;
                }
            }
        },
    };
</script>