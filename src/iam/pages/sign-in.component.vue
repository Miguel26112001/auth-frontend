<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignInRequest} from "../model/sign-in.request.js";

/**
 * Sign in component
 * @summary
 * Display sign-in form
 */
export default {
  name: "sign-in",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      submitted: false,
      loading: false
    };
  },
  computed: {
    isFormInvalid() {
      return !this.username.trim() || !this.password.trim() || this.loading;
    }
  },
  methods: {
    /**
     * Sign in
     * @summary
     * Sign in user. It uses an authentication store to sign in a user.
     * If sign in is successful, it redirects to the home page.
     * The store will update the current username and signed-in status.
     */
    async onSignIn() {
      this.submitted = true;

      if (!this.isFormInvalid) {
        this.loading = true;

        try {
          const authenticationStore = useAuthenticationStore();
          const signInRequest = new SignInRequest(this.username, this.password);

          await authenticationStore.signIn(signInRequest, this.$router, this.rememberMe);

          this.$toast.add({
            severity: 'success',
            summary: this.$t('authentication.messages.welcome'),
            detail: this.$t('authentication.messages.success_detail', { username: this.username }),
            life: 3000
          });

        } catch (error) {
          let errorKey = 'authentication.messages.error_unexpected';

          if (error.response?.status === 401 || error.response?.status === 400) {
            errorKey = 'authentication.messages.error_auth';
          } else if (error.response?.status === 500) {
            errorKey = 'authentication.messages.error_server';
          }

          this.$toast.add({
            severity: 'error',
            summary: this.$t('authentication.login_failed'),
            detail: this.$t(errorKey),
            life: 5000
          });
        } finally {
          this.loading = false;
        }
      }
    }
  }
}
</script>

<template>
  <div class="login-container">
    <pv-card class="login-card shadow-4">
      <template #title>
        <div class="text-center mb-2">
          <h2 class="m-0">{{ $t('authentication.login_title') }}</h2>
        </div>
      </template>

      <template #content>
        <p class="text-center text-secondary mb-5">
          {{ $t('authentication.login_subtitle') }}
        </p>

        <form @submit.prevent="onSignIn" class="flex flex-column gap-4">

          <div class="field">
            <pv-float-label>
              <pv-input-text
                  id="username"
                  v-model="username"
                  :class="{'p-invalid': submitted && !username}"
                  class="w-full"
                  :disabled="loading"
              />
              <label for="username">{{ $t('authentication.username') }}</label>
            </pv-float-label>
            <small v-if="submitted && !username" class="p-error">{{ $t('authentication.username_required') }}</small>
          </div>

          <div class="field">
            <pv-float-label>
              <pv-input-text
                  id="password"
                  v-model="password"
                  type="password"
                  :class="{'p-invalid': submitted && !password}"
                  class="w-full"
                  :feedback="false"
                  :disabled="loading"
              />
              <label for="password">{{ $t('authentication.password') }}</label>
            </pv-float-label>
            <small v-if="submitted && !password" class="p-error">{{ $t('authentication.password_required') }}</small>
          </div>

          <div class="field-checkbox mb-4 flex align-items-center gap-2">
            <pv-checkbox id="rememberMe" v-model="rememberMe" :binary="true" />
            <label for="rememberMe" class="text-sm">{{ $t('authentication.remember_me') }}</label>
          </div>

          <div class="mt-2">
            <pv-button type="submit"
                       :label="$t('authentication.login_button')"
                       icon="pi pi-user"
                       class="w-full"
                       :loading="loading"
                       :disabled="isFormInvalid" />
          </div>

        </form>
      </template>

      <template #footer>
        <div class="text-center mt-2">
          <span class="text-sm">{{ $t('authentication.no_account') }}
            <router-link to="/sign-up" class="no-underline font-bold color-primary-700">
              {{ $t('authentication.signup_link') }}
            </router-link>
          </span>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100%;
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(26, 26, 26, 0.85) !important;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  will-change: transform;
}

.p-error {
  color: #e24c4c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

.w-full {
  width: 100%;
}

.text-center {
  text-align: center;
}

.login-card h2 {
  font-family: 'Inter', sans-serif;
  color: white;
  font-weight: 700;
}

.field-checkbox label {
  color: rgba(255, 255, 255, 0.8) !important;
  cursor: pointer;
}

.color-primary-700 {
  color: var(--primary-color, #10b981) !important;
}

.p-button {
  background: #10b981 !important;
  border: none !important;
}

.p-button:disabled {
  background: rgba(16, 185, 129, 0.4) !important;
  opacity: 0.6;
}
</style>