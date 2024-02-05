import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import AboutPage from './pages/AboutPage.vue';
import SingleProject from './pages/SingleProject.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutPage
        },
        {
            path: '/project/:slug',
            name: 'single-project',
            component: SingleProject
        },
        // Not found page
        {
            path: "/:pathMath(.*)*",
            name: "not-found",
            component: NotFoundPage
        }
    ],
})

export { router };