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

    <header>
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

    <main class="main-content">
      <router-view/>
    </main>

    <footer class="footer-section bg-primary">
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
</style>