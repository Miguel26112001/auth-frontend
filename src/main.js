import {createApp} from 'vue'
import i18n from "./i18n.js";
import {PrimeVue} from "@primevue/core";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Material from '@primeuix/themes/material';
import pinia from "./pinia.js";
import router from "./router/index.js";
import App from "./App.vue";
import {
    Avatar,
    Button, Card,
    ConfirmationService, ConfirmDialog,
    DialogService, Drawer,
    FloatLabel,
    InputText,
    Message,
    SelectButton, Toast,
    ToastService, Toolbar
} from "primevue";

const app = createApp(App);

app
    .use(i18n)
    .use(pinia)
    .use(PrimeVue, {theme: { preset: Material}, ripple: true})
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-select-button', SelectButton)
    .component('pv-button', Button)
    .component('pv-float-label', FloatLabel)
    .component('pv-input-text', InputText)
    .component('pv-message', Message)
    .component('pv-toast', Toast)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-toolbar', Toolbar)
    .component('pv-drawer', Drawer)
    .component('pv-card', Card)
    .component('pv-avatar', Avatar)
    .use(router)
    .mount('#app')