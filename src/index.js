import { createApp } from "vue";

import { createWebHashHistory, createRouter } from 'vue-router'

import ToDo from "./Pages/ToDo.vue";
import Modals from "./Pages/Modals.vue";
import Messages from "./Pages/Messages.vue"; 

const routes = [
  { path: '/', component: ToDo, name: 'ToDo' },
  { path: '/modals', component: Modals, name: 'Modals' },
  { path: '/messages', component: Messages, name: 'Messages' }, 
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

import App from './App.vue';

const app = createApp(App);
app.use(router)
app.mount('#app')