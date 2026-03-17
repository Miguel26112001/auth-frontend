import {useAuthenticationStore} from "./authentication.store.js";

/**
 * Guard to check if the user is authenticated
 * @summary
 * This guard checks if the user is authenticated.
 * If a user is not authenticated and tries to navigate to a route that requires authentication,
 * it redirects to the sign-in page, otherwise it allows navigation.
 * @param to - Route to navigate to
 * @returns {boolean|object} - Returns true to allow, or a route object to redirect
 */
export const authenticationGuard = (to) => {
    const authenticationStore = useAuthenticationStore();

    const isAnonymous = !authenticationStore.isSignedIn;
    const publicRoutes = ['/sign-in', '/sign-up', '/about', '/page-not-found'];

    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);

    if (isAnonymous && routeRequiresToBeAuthenticated) {
        return { name: 'sign-in' };
    }

    return true;
}