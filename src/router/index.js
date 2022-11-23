import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '/components/Welcome.vue';
import Singleplayer from '/components/Singleplayer.vue';
import Multiplayer from '/components/Multiplayer.vue';

const routes = [
    {
        path: "/",
        component: Welcome,
    },
    {
        path: "/singleplayer",
        component: Singleplayer
    },
    {
        path: "/multiplayer",
        component: Multiplayer
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router