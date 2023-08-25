import {createRouter, createWebHashHistory} from "vue-router"
const ErrorPage = { template: '<div>404</div>' }
const routes = [
    {path: '/form-validation', component: () => import("../components/formValidation/index.vue")},
    {path: '/task', component: () => import("../components/Task/index.vue")},
    {path: '/for-ppt', component: () => import("../components/ForPPT/index.vue")},
    {
        path: "/",
        redirect: "/form-validation"
    },
    {
        path: "/404",
        component:() => import("../components/Task/index.vue"),
        meta: {
            hidden: true
        },
        alias: "/:pathMatch(.*)*"
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router
