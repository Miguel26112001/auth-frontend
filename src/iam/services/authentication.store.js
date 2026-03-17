import {AuthenticationService} from "./authentication.service.js";
import {defineStore} from "pinia";
import {SignInResponse} from "../model/sign-in.response.js";
import {SignUpResponse} from "../model/sign-up.response.js";
import {jwtDecode} from "jwt-decode";

const authenticationService = new AuthenticationService();

/**
 * Store definition for authentication
 * @summary
 * This store is responsible for managing the authentication state.
 * It contains state for signed-in status, user ID, and username.
 * It contains actions to sign-in, sign-up, and sign-out.
 */
export const useAuthenticationStore = defineStore('authentication',{
    state: () => ({
        signedIn: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
        userId: 0,
        username: '',
        email: ''
    }),
    getters: {
        /**
         * Getter to check if user is signed in
         * @param state - Current state of the store
         * @returns {boolean} - True if user is signed in, false otherwise
         */
        isSignedIn: (state) => state['signedIn'],
        /**
         * Getter to get the current user ID
         * @param state - Current state of the store
         * @returns {number} - Current user ID
         */
        currentUserId: (state) => state['userId'],
        /**
         * Getter to get the current username
         * @param state - Current state of the store
         * @returns {string} - Current username
         */
        currentUsername: (state) => state['username'],
        /**
         * Getter to get the current token
         * @returns {string} - Current token
         */
        currentToken: () => localStorage.getItem('token') || sessionStorage.getItem('token'),

        checkIsSignedIn: (state) => !!(this.state.signedIn || localStorage.getItem('token') || sessionStorage.getItem('token'))
    },
    actions: {
        initStore() {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (token) {
                this.signedIn = true;
            }
        },

        restoreSession() {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (token) {
                try {
                    const decoded = jwtDecode(token);

                    this.username = decoded.sub || decoded.username || 'User';
                    this.userId = decoded.id || 0;
                    this.signedIn = true;

                    console.log("Sesión restaurada para:", this.username);
                } catch (error) {
                    console.error("Error al decodificar el token:", error);
                    this.signOut().then(r => console.log("Sesión cerrada debido a token inválido"));
                }
            }
        },
        /**
         * Action to sign-in
         * @summary
         * This action calls the sign-in API and updates the store state.
         * If sign-in is successful, it sets the signed-in status, user ID, and username.
         * It also saves the token in local storage.
         * If sign-in fails, it redirects to the sign-in page.
         * @param signInRequest - The {@link SignInRequest} object to sign-in
         * @param router - Vue router instance
         * @param rememberMe - The value to represent whether to remember the user or not
         */
        async signIn(signInRequest, router, rememberMe) {
            try {
                const response = await authenticationService.signIn(signInRequest);
                let signInResponse = new SignInResponse(
                    response.data.id,
                    response.data.username,
                    response.data.email,
                    response.data.token
                );

                this.signedIn = true;
                this.userId = signInResponse.id;
                this.username = signInResponse.username;
                this.email = signInResponse.email;

                if (rememberMe) {
                    localStorage.setItem('token', signInResponse.token);
                } else {
                    sessionStorage.setItem('token', signInResponse.token);
                }

                router.push({ name: 'home' });
                return response;
            } catch (error) {
                console.error("Error en SignIn:", error);
                throw error;
            }
        },

        /**
         * Action to sign-up
         * @summary
         * This action calls the sign-up API.
         * If sign-up is successful, it redirects to the sign-in page.
         * If sign-up fails, it redirects to the sign-up page.
         * @param signUpdRequest - The {@link SignUpRequest} object to sign-up
         * @param router - Vue router instance
         */
        async signUp(signUpdRequest, router) {
            try {
                const response = await authenticationService.signUp(signUpdRequest);

                let signUpResponse = new SignUpResponse(
                    response.data.id,
                    response.data.username,
                    response.data.email,
                    response.data.roles,
                    response.data.isActive
                );

                console.log(signUpResponse);
                router.push({ name: 'sign-in' });
                return response;
            } catch (error) {
                console.error("Error en SignUp:", error);
                throw error;
            }
        },

        /**
         * Action to sign-out
         * @summary
         * This action signs out the user.
         * It sets the signed-in status to false, user ID to 0, and username to empty string.
         * It also removes the token from local storage.
         * It redirects to the sign-in page.
         * @param router - Vue router instance
         */
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.username = '';

            localStorage.removeItem('token');
            sessionStorage.removeItem('token');

            console.log('Signed out');
            router.push({ name: 'sign-in' });
        }
    }
});