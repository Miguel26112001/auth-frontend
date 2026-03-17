<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: [],
    }
  },
  created() {
    this.languages = this.$i18n.availableLocales;
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>

<template>
  <div class="language-switcher">
    <div class="switcher-container">
      <button
          v-for="lang in languages"
          :key="lang"
          @click="setLanguage(lang)"
          :class="['lang-btn', { 'active': $i18n.locale === lang }]"
      >
        <span class="lang-text">{{ lang.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
}

.switcher-container {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.lang-btn {
  background: transparent;
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 6px;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.lang-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

.lang-btn.active {
  background: white;
  color: #1a1a1a;
  opacity: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.lang-text {
  letter-spacing: 1px;
}

:deep(.bg-primary) .switcher-container {
  background: rgba(0, 0, 0, 0.15);
}
</style>