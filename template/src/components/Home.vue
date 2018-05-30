<template>
    <Page class='home' actionBarHidden='true' backgroundSpanUnderStatusBar='true' enableSwipeBackNavigation='false'>
        <NavigationButton visibility='collapsed' justifyContent='space-between' alignContent='space-between' />
        <TabView>
            <TabViewItem title="Messages">
                <ChatRoomList />
            </TabViewItem>
            <TabViewItem title="Profil">
                <DockLayout stretchLastChild='false'>
                    <StackLayout class='home-controller' dock='top'>
                        <Image src='res://boom_logo' stretch='aspectFit' horizontalAlignment='center' class='logo' />

                        <Label text='Hello,' horizontalAlignment='center' />
                        <Label horizontalAlignment='center'>{{ name }}</Label>
                    </StackLayout>

                    <Button
                        text='Logout'
                        class='logout-button'
                        dock='bottom'
                        @tap='logout()' />
                </DockLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import ApiService from '../services/ApiService';

    import Login from './Login.vue';

    export default {
        components: {
            ChatRoomList
        },
        data() {
            return {
                user: {}
            }
        }
        computed: {
            ...mapGetters({
                getApiHeaders: 'user/getApiHeaders',
            }),

            name() {
                return this.user.first_name + ' ' + this.user.last_name;
            },

            user() {
                return this.getUserData;
            },
        },
        beforeMount() {
            this.api = new ApiService();
            this.api.setHeader(this.getApiHeaders);

            this.api.get('users/2').then((response) => {
                const user = response.data.user;

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