import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import Game from "./pages/Game.vue";
import Stats from "./pages/Stats.vue"
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home, 
    },
    {
        path : "/game",
        name : "Game",
        component : Game
    },
    {
        path : "/history",
        name : "Stats",
        component :Stats
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
