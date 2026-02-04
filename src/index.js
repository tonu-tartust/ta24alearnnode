import { createApp } from "vue";

import { createWebHashHistory, createRouter } from 'vue-router'

import ToDo from "./Pages/ToDo.vue";
import Modals from "./Pages/Modals.vue";

const routes = [
  { path: '/', component: ToDo },
  { path: '/modals', component: Modals },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

import App from './App.vue';

const app = createApp(App);
app.use(router)
app.mount('#app')