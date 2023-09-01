import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: '/login',
        name: "login",
        component: () => import("../components/login/index.vue"),
        meta:{
            // 是否为动态路由
            isDynamic:false
        }
    },
    {
        path: '/form-validation',
        name: "formValidation",
        component: () => import("../components/formValidation/index.vue"),
        meta:{
            isDynamic:false
        }
    },
    // {
    //     path: '/task',
    //     name: 'task',
    //     component: () => import("../components/Task/index.vue")
    // },
    {
        path: '/for-ppt',
        name: 'forPpt',
        component: () => import("../components/ForPPT/index.vue"),
        meta:{
            isDynamic:false
        }
    },
    {
        path: '/table-validation',
        name: 'tableValidation',
        component: () => import("../components/tableValidation/index.vue"),
        meta:{
            isDynamic:false
        }
    },
    {
        path: "/",
        redirect: "/login",
        meta:{
            isDynamic:false
        }
    },
    {
        path: "/404",
        component: () => import("../components/404page/index.vue"),
        meta:{
            isDynamic:false
        }
    },
    {
        path: '/:path(.*)*',
        redirect: '/404',
        name: '404Page',
        meta:{
            isDynamic:false
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from) => {
    // console.log("to", to)
    // console.log("from", from)
    // ...
    // 返回 false 以取消导航
    // return false

})


export default router
