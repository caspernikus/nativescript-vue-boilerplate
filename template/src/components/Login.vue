<template>
    <Page class='login' actionBarHidden='true' backgroundSpanUnderStatusBar='true' enableSwipeBackNavigation='false'>
        <StackLayout class='login-controller' verticalAlignment='center'>
            <GridLayout ref='formControls' height='180' rows='auto, auto, auto' translateY='-50'>
                <Image src='~/images/logo.png' stretch='aspectFit' row='0' horizontalAlignment='center' class='logo' />
                <TextField ref="email"
                    v-model='user.email'
                    :iEnabled='!isAuthenticating'
                    hint='Email Address'
                    keyboardType='email'
                    returnKeyType='next'
                    autocorrect='false'
                    autocapitalizationType='none'
                    row='1' 
                    @returnPress='focusPassword()' />
                <TextField ref='password'
                    v-model='user.password'
                    :isEnabled='!isAuthenticating'
                    hint='Password'
                    secure='true'
                    returnKeyType='done'
                    row='2' 
                    @returnPress='login()' />

                <ActivityIndicator :busy='isAuthenticating' rowSpan='3' />
            </GridLayout>

            <Button
                :isEnabled='!isAuthenticating'
                text='Login'
                class='submit-button'
                @tap='login()' />
        </StackLayout>
    </Page>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    import Home from './Home.vue';

    export default {
        data() {
            return {
                isAuthenticating: false,
                user: {
                    email: '',
                    password: ''
                }
            };
        },
        computed: {
            ...mapGetters({
                getApiToken: 'user/getApiToken',
            }),
        },
        methods: {
            ...mapActions({
                saveToken: 'user/saveToken',
            }),

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },

            login() {
                this.isAuthenticating = true;

                this.$app.api.post('login', {
                    email: this.user.email,
                    password: this.user.password
                }).then((response) => {
                    const token = response.token;

                    this.saveToken(token).then(() => {
                        this.isAuthenticating = false;

                        this.$navigateTo(Home);
                    });
                }).catch((error) => {
                    this.isAuthenticating = false;

                    alert({
                        title: 'Error: ' + error.statusCode,
                        message: error.message,
                        okButtonText: 'Close'
                    }).then(() => {
                        this.user.email = '';
                        this.user.password = '';
                    });
                });
            },
        },
    };
</script>