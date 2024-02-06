import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./pages/HomePage.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./pages/AboutPage.vue')
        },
        {
            path: '/project/:slug',
            name: 'single-project',
            component: () => import('./pages/SingleProject.vue')
        },
        // Not found page
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import('./pages/NotFoundPage.vue')
        }
    ],
})

export { router };