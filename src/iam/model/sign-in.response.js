/**
 * Sign In Response
 * @summary
 * Represents a sign-in response. This is used to authenticate a user.
 */
export class SignInResponse {
    /**
     * Constructor
     * @param {string} id The id of the user.
     * @param {string} username The username of the user.
     * @param {string} email    the email of the authenticated user
     * @param {string} token The token generated for the user.
     */
    constructor(id, username, email, token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
    }
}