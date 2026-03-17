/**
 * Sign Up Response
 * @summary
 * Represents a sign-up response. This is used to transfer the result of a sign-up operation.
 */
export class SignUpResponse {
    /**
     * Constructor
     * @param {number} id The unique identifier of the user
     * @param {string} username The username of the user
     * @param {string} email The email address of the user
     * @param {string[]} roles The list of roles assigned to the user
     * @param {boolean} isActive Indicates whether the user is active
     */
    constructor(id, username, email, roles = [], isActive) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.isActive = isActive;
    }
}