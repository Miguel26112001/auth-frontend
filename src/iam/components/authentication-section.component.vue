<script>
import {useRouter} from "vue-router";
import {useAuthenticationStore} from "../services/authentication.store.js";

/**
 * Authentication section component
 * @summary
 * Display sign-in, sign up, sign out buttons.
 * If a user is signed in, display a welcome message and sign-out button, otherwise display sign-in and sign-up buttons.
 */
export default {
  name: "authentication-section",
  data() {
    return {
      router: useRouter(),
      authenticationStore: useAuthenticationStore()
    };
  },
  computed: {
    /**
     * Check if user is signed in
     * @returns {boolean} true if user is signed in
     */
    isSignedIn() {
      return this.authenticationStore.isSignedIn;
    },
    /**
     * Get current username
     * @returns {string} current username
     */
    currentUsername() {
      return this.authenticationStore.currentUsername;
    },
  },
  methods: {
    /**
     * Sign in
     * @summary
     * Redirect to sign-in page
     */
    onSignIn() {
      this.router.push({name: "sign-in"});
    },
    /**
     * Sign up
     * @summary
     * Redirect to sign-up page
     */
    onSignUp() {
      this.router.push({name: "sign-up"});
    },
    /**
     * Sign out
     * @summary
     * Sign out user
     */
    onSignOut() {
      this.authenticationStore.signOut(this.router);
    }
  }
}
</script>

<template>
  <div class="auth-section">
    <div v-if="isSignedIn" class="flex align-items-center gap-3">
      <div class="user-info flex align-items-center gap-2 px-3 py-1">
        <pv-avatar
            :label="currentUsername ? currentUsername.charAt(0).toUpperCase() : '?'"
            shape="circle"
            class="user-avatar bg-primary color-primary-700"
        />
        <span class="username-text">Welcome, <strong>{{ currentUsername }}</strong></span>
      </div>

      <pv-button
          icon="pi pi-sign-out"
          label="Sign Out"
          variant="text"
          class="sign-out-btn"
          @click="onSignOut"
      />
    </div>

    <div v-else class="flex gap-2">
      <pv-button
          label="Sign In"
          icon="pi pi-user"
          variant="text"
          class="auth-btn p-button-sm"
          @click="onSignIn"
      />
      <pv-button
          label="Sign Up"
          icon="pi pi-user-plus"
          class="auth-btn-signup p-button-sm shadow-2 color-primary-700"
          @click="onSignUp"
      />
    </div>
  </div>
</template>

<style scoped>
.auth-section {
  display: flex;
  align-items: center;
}

.user-info {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  color: white;
}

.username-text {
  font-size: 0.9rem;
}

.user-avatar {
  font-weight: bold;
  width: 2rem;
  height: 2rem;
}

.auth-btn, .sign-out-btn {
  color: white !important;
  border-radius: 8px;
  transition: background 0.3s;
}

.auth-btn:hover, .sign-out-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.auth-btn-signup {
  background: white !important;
  border: none;
  border-radius: 8px;
  font-weight: bold;
}

.auth-btn-signup:hover {
  background: #f8f9fa !important;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .username-text {
    display: none;
  }
}
</style>