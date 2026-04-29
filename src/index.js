import { createApp } from "vue";

import {
  createWebHashHistory,
  createWebHistory,
  createRouter,
} from "vue-router";

import ToDo from "./Pages/ToDo.vue";
import Modals from "./Pages/Modals.vue";
import Messages from "./Pages/Messages.vue";
import Buttons from "./Pages/Buttons.vue";
import ChuckNorris from "./Pages/ChuckNorris.vue";
import RickAndMorty from "./Pages/RickAndMorty.vue";  
import WebApis from "./Pages/WebApis.vue";

const routes = [
  { path: "/", component: ToDo, name: "ToDo" },
  { path: "/modals", component: Modals, name: "Modals" },
  { path: "/messages", component: Messages, name: "Messages" },
  { path: "/buttons", component: Buttons, name: "Buttons" },
  { path: "/chuck", component: ChuckNorris, name: "Chuck Norris" },
  { path: "/rickandmorty", component: RickAndMorty, name: "Rick and Morty" },
  { path: "/webapis", component: WebApis, name: "Web APIs" }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.mount("#app");