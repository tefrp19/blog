import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

export const Layout = () => import("../layout/index.vue")

// 常驻路由
export const constantRoutes: RouteRecordRaw[] = [
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
        path: '/',
        name: "home",
        redirect:"/home",
        component: Layout,
        children: [
            {
                path: "home",
                component: () => import("../components/home/index.vue")
            }
        ],
        meta: {
            isDynamic: false
        }
    },
    {
        path: '/for-ppt',
        name: "forPpt",
        redirect:"/for-ppt/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/forPpt/index.vue")
            }
        ],
        meta: {
            isDynamic: false
        }
    },
    {
        path: '/business',
        name: "business",
        redirect:"/business/form-validation",
        component: Layout,
        children: [
            {
                path: "form-validation",
                component: () => import("../components/formValidation/index.vue")
            },
            {
                path: "task",
                component: () => import("../components/task/index.vue")
            },
            {
                path: "table-validation",
                component: () => import("../components/tableValidation/index.vue")
            },
        ],
        meta: {
            isDynamic: true
        }
    },
    {
        path: "/v-model-with-props",
        redirect:"/v-model-with-props/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/v-modelWithProps/parent.vue"),
            }
        ],
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
    routes: constantRoutes, // `routes: routes` 的缩写
})

// router.beforeEach((to, from) => {
//     // console.log("to", to)
//     // console.log("from", from)
//     // ...
//     // 返回 false 以取消导航
//     // return false
//
// })

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
    const dynamicRoutesStr = localStorage.getItem("dynamicRoutes")
    if (dynamicRoutesStr) {
        const dynamicRoutes = JSON.parse(dynamicRoutesStr)
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
