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
    Button, Card, Checkbox,
    ConfirmationService, ConfirmDialog,
    DialogService, Drawer,
    FloatLabel,
    InputText,
    Message,
    SelectButton, Toast,
    ToastService, Toolbar
} from "primevue";

import { definePreset } from '@primevue/themes';

const MyLearningCenterPreset = definePreset(Material, {
    semantic: {
        primary: {
            50: '{emerald.50}',
            100: '{emerald.100}',
            200: '{emerald.200}',
            300: '{emerald.300}',
            400: '{emerald.400}',
            500: '#10b981',
            600: '{emerald.600}',
            700: '{emerald.700}',
            800: '{emerald.800}',
            900: '{emerald.900}',
            950: '{emerald.950}'
        },
        colorScheme: {
            dark: {
                primary: {
                    color: '{primary.500}',
                    inverseColor: '#ffffff',
                    hoverColor: '{primary.400}',
                    activeColor: '{primary.300}'
                }
            }
        }
    }
});

const app = createApp(App);

app
    .use(i18n)
    .use(pinia)
    .use(PrimeVue, {
        theme: {
            preset: MyLearningCenterPreset,
            options: {
                darkModeSelector: 'system',
            }
        }
    })
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
    .component('pv-checkbox', Checkbox)
    .use(router)
    .mount('#app')