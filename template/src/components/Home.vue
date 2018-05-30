<template>
    <Page class='home' actionBarHidden='true' backgroundSpanUnderStatusBar='true' enableSwipeBackNavigation='false'>
        <NavigationButton visibility='collapsed' justifyContent='space-between' alignContent='space-between' />
        <DockLayout stretchLastChild='false'>
            <StackLayout class='home-controller' dock='top'>
                <Image src='~/images/logo.png' stretch='aspectFit' horizontalAlignment='center' class='logo' />

                <Label text='Hello,' horizontalAlignment='center' />
                <Label horizontalAlignment='center'>{{ userName }}</Label>

                <Image :src='user.avatar' stretch='aspectFit' horizontalAlignment='center' class='logo' />
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

    import ApiService from '../services/ApiService';

    import Login from './Login.vue';

    export default {
        data() {
            return {
                user: {}
            }
        },
        computed: {
            ...mapGetters({
                getApiHeaders: 'user/getApiHeaders',
            }),

            userName() {
                return this.user.first_name + ' ' + this.user.last_name;
            },
        },
        beforeMount() {
            this.api = new ApiService();
            this.api.setHeader(this.getApiHeaders);

            this.api.get('users/2').then((response) => {
                const user = response.data;

                this.user = user;
            }).catch((error) => {
                alert({
                    title: 'Error: ' + error.statusCode,
                    message: error.message,
                    okButtonText: 'Close'
                }).then(() => {
                    this.userLogout();
                    this.$navigateTo(Login, {
                        clearHistory: true
                    });
                });
            });
        },
        methods: {
            ...mapActions({
                userLogout: 'user/logout',
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