/**
 * Sign up request model
 * @summary
 * Represents a sign-up request. This is used to register a user.
 */
export class SignUpRequest {
    /**
     * Constructor
     * @param {string} username The username of the user.
     * @param {string} email The email of the user.
     * @param {string} password The password of the user.
     * @param {string[]} roles The list of roles to assign to the user.
     */
    constructor(username, email, password, roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    /**
     * Validates that all required fields are present
     * @returns {boolean} True if the request is valid
     */
    isValid() {
        return this.username?.trim() &&
            this.email?.trim() &&
            this.password?.trim() &&
            this.isValidEmail();
    }

    /**
     * Validates email format
     * @returns {boolean} True if email format is valid
     */
    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
}