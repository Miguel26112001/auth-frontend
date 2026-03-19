<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";
import AuthenticationSection from "./iam/components/authentication-section.component.vue";
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";

export default {
  name: 'App',
  components: {AuthenticationSection, FooterContent, LanguageSwitcher},
  data() {
    return {
      drawer: false,
      items: [
        {label: 'option.home',       to: '/home'}
      ]
    }
  },
  created() {
    const authStore = useAuthenticationStore();
    authStore.restoreSession();
  },
  computed: {
    isAuthPage() {
      const authRoutes = ['sign-in', 'sign-up'];
      return authRoutes.includes(this.$route.name);
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}

</script>

<template>
  <div class="app-container">
    <pv-toast/>
    <pv-confirm-dialog/>

    <!-- Background Video solo para Login/Sign-up -->
    <div v-if="isAuthPage" class="video-background-container">
      <video autoplay muted loop playsinline class="video-bg">
        <source src="@/assets/videos/login-bg.mp4" type="video/mp4">
      </video>
      <div class="video-overlay"></div>
    </div>

    <!-- Header con Glassmorphism -->
    <header v-if="!isAuthPage" class="app-header">
      <pv-toolbar class="glass-toolbar border-none">
        <template #start>
          <pv-button
              class="p-button-text p-button-rounded p-button-plain"
              icon="pi pi-bars"
              @click="toggleDrawer"
          />
          <h3 class="app-logo ml-3 m-0">ACME <span>Learning Center</span></h3>
        </template>

        <template #center>
          <div class="flex gap-1">
            <pv-button
                v-for="item in items"
                :key="item.label"
                as-child
                v-slot="slotProps"
                class="nav-button p-button-text"
            >
              <router-link :to="item.to" :class="slotProps['class']">
                {{ $t(item.label) }}
              </router-link>
            </pv-button>
          </div>
        </template>

        <template #end>
          <div class="flex align-items-center gap-3">
            <authentication-section/>
            <div class="divider"></div>
            <language-switcher/>
          </div>
        </template>
      </pv-toolbar>
      <pv-drawer v-model:visible="drawer" header="Menu"/>
    </header>

    <main :class="['main-content', { 'auth-layout': isAuthPage, 'app-layout': !isAuthPage }]">
      <div v-if="isAuthPage" class="absolute top-0 right-0 p-4" style="z-index: 10">
        <language-switcher />
      </div>
      <router-view/>
    </main>

    <footer v-if="!isAuthPage" class="app-footer">
      <footer-content/>
    </footer>
  </div>
</template>

<style scoped>
/* --- Reset & Variables --- */
:root {
  --primary-color: #10b981; /* Tu color Esmeralda */
  --surface-ground: #f8fafc;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif; /* Recomiendo usar Inter o Roboto */
  background-color: var(--surface-ground);
}

/* --- Layout Containers --- */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content.app-layout {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* --- Estética del Header (Toolbar) --- */
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.app-logo {
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #1e293b;
}

.app-logo span {
  color: var(--primary-color);
  font-weight: 400;
}

.nav-button {
  font-weight: 600 !important;
  color: #64748b !important;
}

.nav-button:hover {
  color: var(--primary-color) !important;
  background: rgba(16, 185, 129, 0.08) !important;
}

.divider {
  width: 1px;
  height: 24px;
  background: #e2e8f0;
}

/* --- Video Background & Overlays --- */
.video-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      135deg,
      rgba(15, 23, 42, 0.9) 0%, /* Azul muy oscuro */
      rgba(16, 185, 129, 0.3) 100% /* Tu esmeralda con transparencia */
  );
  backdrop-filter: blur(8px); /* Aumenté el blur para más elegancia */
}

/* --- Auth Page Specifics --- */
.main-content.auth-layout {
  background: transparent !important;
  padding: 0;
}

/* --- Footer --- */
.app-footer {
  margin-top: auto;
  background: #1e293b; /* Un gris muy oscuro para el footer */
  color: white;
  padding: 2rem;
}

/* Helpers */
.border-none { border: none !important; }

.video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: black; /* Esto ayuda a ver si el problema es el video o el CSS */
}
</style>