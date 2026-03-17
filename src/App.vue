<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";
import AuthenticationSection from "./iam/components/authentication-section.component.vue";

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

    <div v-if="isAuthPage" class="video-background-container">
      <video
          autoplay
          muted
          loop
          playsinline
          class="video-bg"
      >
        <source src="@/assets/videos/login-bg.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="video-overlay"></div>
    </div>

    <header v-if="!isAuthPage">
      <pv-toolbar class="bg-primary border-none border-noround">
        <template #start>
          <pv-button class="p-button-text p-button-plain" icon="pi pi-bars" @click="toggleDrawer"/>
          <h3 class="ml-2 m-0">ACME Learning Center</h3>
        </template>

        <template #center>
          <div class="flex gap-2">
            <pv-button v-for="item in items" :key="item.label" as-child v-slot="slotProps" class="p-button-text">
              <router-link :to="item.to" :class="slotProps['class']">{{ $t(item.label) }}</router-link>
            </pv-button>
          </div>
        </template>

        <template #end>
          <div class="flex align-items-center gap-3">
            <authentication-section/>
            <language-switcher/>
          </div>
        </template>
      </pv-toolbar>
      <pv-drawer v-model:visible="drawer"/>
    </header>

    <main :class="['main-content', { 'auth-layout': isAuthPage }]">
      <div class="absolute top-0 right-0 p-4">
        <language-switcher />
      </div>
      <router-view/>
    </main>

    <footer v-if="!isAuthPage" class="footer-section bg-primary">
      <footer-content/>
    </footer>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
}

#app {
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.footer-section {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.border-none { border: none !important; }
.border-noround { border-radius: 0 !important; }
.m-0 { margin: 0 !important; }

.main-content.auth-layout {
  background: transparent;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  overflow: hidden;
}

.video-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(20, 160, 140, 0.4) 100%
  );
  backdrop-filter: blur(4px);
}
</style>