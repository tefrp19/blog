import {createRouter, createWebHashHistory, RouteRecord, RouteRecordRaw} from "vue-router"
import {App} from "vue";

const routes = [
    {
        path: '/login',
        name: "login",
        component: () => import("../components/login/index.vue"),
        meta: {
            // 是否为动态路由
            isDynamic: false
        }
    },
    {
        path: '/form-validation',
        name: "formValidation",
        component: () => import("../components/formValidation/index.vue"),
        meta: {
            isDynamic: false
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
        meta: {
            isDynamic: false
        }
    },
    {
        path: '/table-validation',
        name: 'tableValidation',
        component: () => import("../components/tableValidation/index.vue"),
        meta: {
            isDynamic: false
        }
    },
    {
        path: "/",
        redirect: "/login",
        meta: {
            isDynamic: false
        }
    },
    {
        path: "/v-model-with-props",
        component: () => import("../components/v-modelWithProps/parent.vue"),
        meta: {
            isDynamic: false
        }
    },
    {
        path: "/404",
        component: () => import("../components/404page/index.vue"),
        meta: {
            isDynamic: false
        }
    },
    {
        path: '/:path(.*)*',
        redirect: '/404',
        name: '404Page',
        meta: {
            isDynamic: false
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

// 模拟接口
export const getDynamicRoutes = () => {
    return new Promise(resolve => {
        const newRoutes = [
            {
                path: "/task",
                name: "task",
                componentUrl: "/src/components/Task/index.vue",
                meta: {
                    isDynamic: true
                }
            },
        ]
        resolve(newRoutes)
    })
}

// 所有组件
const modules = import.meta.glob('/src/components/**/**.vue')
// console.log("modules",modules)

type RouteRecordRawPlus = RouteRecordRaw & {
    componentUrl: string
}
export const addRoutes = () => {
    const menuListStr = localStorage.getItem("menuList")
    if (menuListStr) {
        const dynamicRoutes = JSON.parse(menuListStr)
        dynamicRoutes.forEach((route: RouteRecordRawPlus) => {
            route.component = modules[route.componentUrl]
            router.addRoute(route)
        })
    }
}

export const removeRoutes = () => {
    localStorage.removeItem("menuList")
    router.getRoutes().forEach(route => {
        const {isDynamic} = route.meta
        if (isDynamic) {
            const {name} = route
            router.removeRoute(name as string)
        }
    })
}

addRoutes()
export default router
