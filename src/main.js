import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import BKSDK from './api/index';

import Mask from '@/components/mask/index'



const BKAPI = BKSDK('123432423');

const app = createApp(App);
app.use(router)
app.mount("#app");

app.config.globalProperties.BKAPI=BKAPI;
app.config.globalProperties.$loading = Mask;


