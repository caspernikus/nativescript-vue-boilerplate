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
                console.error(error);
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
            }
        },
    };
</script>