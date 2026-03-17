<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      formSubmitted: false,
      loading: false
    };
  },
  computed: {
    isUsernameValid() {
      return this.username && this.username.trim().length > 0;
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.email && emailRegex.test(this.email);
    },
    isPasswordValid() {
      return this.password && this.password.length >= 8;
    },
    doPasswordsMatch() {
      return this.password === this.confirmPassword;
    },
    isFormValid() {
      return this.isUsernameValid &&
          this.isEmailValid &&
          this.isPasswordValid &&
          this.doPasswordsMatch;
    }
  },
  methods: {
    async onSignUp() {
      this.formSubmitted = true;

      if (!this.isFormValid) {
        this.$toast.add({
          severity: 'warn',
          summary: 'Validation Failed',
          detail: 'Please check the required fields.',
          life: 3000
        });
        return;
      }

      this.loading = true;

      try {
        let signUpRequest = new SignUpRequest(this.username, this.email, this.password, ["ROLE_USER"]);

        await this.authenticationStore.signUp(signUpRequest, this.$router);

        this.$toast.add({
          severity: 'success',
          summary: 'Account Created',
          detail: `A verification email has been sent to ${this.email}. Please check your inbox.`,
          life: 5000
        });

      } catch (error) {
        console.error("Sign-up process failed:", error);
        const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';

        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 4000
        });
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<template>
  <div class="signup-container">
    <pv-card class="signup-card shadow-4">
      <template #title>
        <div class="text-center mb-2">
          <h2 class="m-0">Create Account</h2>
        </div>
      </template>

      <template #content>
        <p class="text-center text-secondary mb-5">
          Join ACME Learning Center today.
        </p>

        <form @submit.prevent="onSignUp" class="flex flex-column gap-4">

          <div class="field">
            <pv-float-label>
              <pv-input-text
                  id="username"
                  v-model="username"
                  :class="{'p-invalid': formSubmitted && !isUsernameValid}"
                  class="w-full"
              />
              <label for="username">Username *</label>
            </pv-float-label>
            <small v-if="formSubmitted && !isUsernameValid" class="p-error">Username is required.</small>
          </div>

          <div class="field">
            <pv-float-label>
              <pv-input-text
                  id="email"
                  v-model="email"
                  type="email"
                  :class="{'p-invalid': formSubmitted && !isEmailValid}"
                  class="w-full"
              />
              <label for="email">Email *</label>
            </pv-float-label>
            <small v-if="formSubmitted && !isEmailValid" class="p-error">
              {{ !email ? 'Email is required.' : 'Invalid email address.' }}
            </small>
          </div>

          <div class="field">
            <pv-float-label>
              <pv-input-text
                  id="password"
                  v-model="password"
                  type="password"
                  :class="{'p-invalid': formSubmitted && !isPasswordValid}"
                  class="w-full"
              />
              <label for="password">Password * (Min. 8 chars)</label>
            </pv-float-label>
            <small v-if="formSubmitted && !isPasswordValid" class="p-error">Password must be at least 8 characters.</small>
          </div>

          <div class="field">
            <pv-float-label>
              <pv-input-text
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  :class="{'p-invalid': formSubmitted && (!confirmPassword || !doPasswordsMatch)}"
                  class="w-full"
              />
              <label for="confirmPassword">Confirm Password *</label>
            </pv-float-label>
            <small v-if="formSubmitted && !confirmPassword" class="p-error">Please confirm your password.</small>
            <small v-else-if="formSubmitted && !doPasswordsMatch" class="p-error">Passwords do not match.</small>
          </div>

          <div class="mt-2">
            <pv-button
                type="submit"
                label="Sign Up"
                icon="pi pi-user-plus"
                :loading="loading"
                class="w-full p-button-raised"
            />
          </div>
        </form>
      </template>

      <template #footer>
        <div class="text-center mt-2">
          <span class="text-sm text-color-secondary">Already have an account?
            <router-link to="/sign-in" class="no-underline font-bold color-primary-700">Sign In</router-link>
          </span>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  width: 100%;
  padding: 1rem;
}

.signup-card {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  background: rgba(26, 26, 26, 0.85) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.w-full {
  width: 100%;
}

.text-center {
  text-align: center;
}

.p-error {
  color: #e24c4c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}
</style>