import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: '/form-validation',
        name: "formValidation",
        component: () => import("../components/formValidation/index.vue")
    },
    {
        path: '/task',
        name: 'task',
        component: () => import("../components/Task/index.vue")
    },
    {
        path: '/for-ppt',
        name: 'forPpt',
        component: () => import("../components/ForPPT/index.vue")
    },
    {
        path: "/",
        redirect: "/form-validation"
    },
    {
        path: "/404",
        component: () => import("../components/Task/index.vue"),
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

router.beforeEach((to, from) => {
    console.log("to", to)
    console.log("from", from)
    // ...
    // 返回 false 以取消导航
    // return false

})

export default router
