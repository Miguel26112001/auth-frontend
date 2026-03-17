<script>
export default {
  name: "footer-content"
}
</script>

<template>
  <div class="footer-wrapper">
    <div class="footer-grid">

      <div class="footer-brand">
        <h4 class="m-0">ACME Learning Center</h4>
        <p class="text-sm opacity-70">Empowering education through technology.</p>
      </div>

      <div class="footer-main-info text-center">
        <p class="m-0 font-medium">
          {{ $t('authoring-phrase.intro') }}
          <i class="pi pi-heart-fill heart-icon"></i>
          {{ $t('authoring-phrase.use') }}
          <a href="https://primevue.org/" target="_blank" class="footer-link">PrimeVue</a>
        </p>
        <small class="opacity-70">{{ $t('authoring-phrase.author', {brand: 'Miguel Auth'}) }}</small>
      </div>

      <div class="footer-legal text-right">
        <p class="m-0">&copy; 2026 ACME Studios</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.footer-wrapper {
  width: 100%;
  padding: 1.5rem 0;
  color: currentColor;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-link {
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 1px 0 0 currentColor;
  transition: opacity 0.2s;
}

.footer-link:hover {
  opacity: 0.7;
}

.legal-links a {
  color: inherit;
  text-decoration: none;
  font-size: 0.8rem;
  opacity: 0.8;
}

.legal-links a:hover {
  opacity: 1;
}

.heart-icon {
  color: #ef4444;
  font-size: 0.9rem;
  margin: 0 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }

  .footer-legal, .footer-brand {
    text-align: center;
  }

  .legal-links {
    justify-content: center;
  }
}

.opacity-70 { opacity: 0.7; }
.text-sm { font-size: 0.875rem; }
.font-medium { font-weight: 500; }
</style>