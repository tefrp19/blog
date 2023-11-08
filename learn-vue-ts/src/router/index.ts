import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"
import {useAppStore} from "../store";
import {nextTick} from "vue";

export const Layout = () => import("../components/layout/index.vue")

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
        redirect: "/home",
        component: Layout,
        children: [
            {
                path: "home",
                component: () => import("../components/home/index.vue")
            }
        ],
        meta: {
            isDynamic: false,
            isMenu: true, // 判断路由是否是菜单
            isSubMenu: false, // 判断路由是否是子级菜单（不是子级菜单则为一级菜单）
            title: "首页", // 菜单名称
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
        path: "/v-model-with-props",
        name: "v-modelWithProps",
        redirect: "/v-model-with-props/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/v-modelWithProps/parent.vue")
            }
        ],
        meta: {
            isDynamic: true,
            isMenu: true,
            isSubMenu: false,
            title: "v-modelWithProps"
        }
    },
    {
        path: "/database-table-visualization",
        name: "databaseTableVisualization",
        redirect: "/database-table-visualization/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/databaseTableVisualization/index.vue")
            }
        ],
        meta: {
            isDynamic: true,
            isMenu: true,
            isSubMenu: false,
            title: "数据库表可视化",
        }
    },
    {
        path: "/dir-upload",
        name: "dirUpload",
        redirect: "/dir-upload/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/dirUpload/index.vue")
            }
        ],
        meta: {
            isDynamic: true,
            isMenu: true,
            isSubMenu: false,
            title: "文件夹上传",
        }
    },
    {
        path: "/ref-test",
        redirect: "/ref-test/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/refTest/index.vue")
            }
        ],
        meta: {
            isDynamic: true,
            isMenu: true,
            isSubMenu: false,
            title: "模板引用",
        }
    },
    {
        path: "/fullCalendar",
        redirect: "/fullCalendar/index",
        component: Layout,
        children: [
            {
                path: "index",
                component: () => import("../components/fullCalendar/index.vue")
            }
        ],
        meta: {
            isDynamic: true,
            isMenu: true,
            isSubMenu: false,
            title: "日程管理",
        }
    },
    // {
    //     path: '/:path(.*)*',
    //     redirect: '/404',
    //     name: '404Page',
    //     meta: {
    //         isDynamic: false
    //     }
    // },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes, // `routes: routes` 的缩写
})

router.beforeEach(async (to, from) => {

})

// 模拟接口
export const getDynamicRoutes = () => {
    const layoutComponentUrl = "/src/components/layout/index.vue"
    return new Promise(resolve => {
        const newRoutes = [
            {
                path: '/for-ppt',
                name: "forPpt",
                redirect: "/for-ppt/index",
                componentUrl: layoutComponentUrl,
                children: [
                    {
                        path: "index",
                        componentUrl: "/src/components/forPpt/index.vue",
                    }
                ],
                meta: {
                    isDynamic: true,
                    isMenu: true,
                    isSubMenu: false,
                    title: "ppt演示多个图"
                }
            },
            {
                path: '/business',
                name: "business",
                redirect: "/business/form-validation",
                componentUrl: layoutComponentUrl,
                children: [
                    {
                        path: "form-validation",
                        menuPath: "/business/form-validation", // 全路径，用于菜单跳转
                        componentUrl: "/src/components/formValidation/index.vue",
                        meta: {
                            title: "表单校验",
                        }
                    },
                    {
                        path: "task",
                        menuPath: "/business/task",
                        componentUrl: "/src/components/task/index.vue",
                        meta: {
                            title: "task",
                        }
                    },
                    {
                        path: "table-validation",
                        menuPath: "/business/table-validation",
                        componentUrl: "/src/components/tableValidation/index.vue",
                        meta: {
                            title: "可编辑表格校验",
                        }
                    },
                ],
                meta: {
                    isDynamic: true,
                    isMenu: true,
                    isSubMenu: true,
                    title: "业务"
                }
            },
        ]
        resolve(newRoutes)
    })
}

// 所有组件
const modules = import.meta.glob('/src/components/**/**.vue')
// console.log("modules",modules)

export type RouteRecordRawPlus = RouteRecordRaw & {
    componentUrl?: string,
    menuPath?: string,
}
export const addRoutes = () => {
    const dynamicRoutesStr = localStorage.getItem("dynamicRoutes")
    if (dynamicRoutesStr) {
        const dynamicRoutes = JSON.parse(dynamicRoutesStr)
        const allRoutes = constantRoutes.concat(dynamicRoutes) // 全部路由
        const {setRoutes} = useAppStore()
        setRoutes(allRoutes)
        convertRoutes(dynamicRoutes)
        // 添加路由
        dynamicRoutes.forEach((route: RouteRecordRawPlus) => {
            router.addRoute(route)
        })
    }
}

/**
 * 将 componentUrl 字符串转换为 component 函数
 * @param routes 待转换的路由数组
 */
const convertRoutes = (routes: RouteRecordRawPlus[]) => {
    // dfs 遍历路由树
    const dfs = (rootRoute: RouteRecordRawPlus) => {
        rootRoute.component = modules[rootRoute.componentUrl]
        if (!rootRoute.children) return
        for (const child of rootRoute.children as RouteRecordRawPlus[]) {
            dfs(child)
        }
    }
    for (const item of routes) {
        dfs(item)
    }
}

export const removeRoutes = () => {
    localStorage.removeItem("dynamicRoutes")
    const {setRoutes} = useAppStore()
    setRoutes([])
    router.getRoutes().forEach(route => {
        const {isDynamic} = route.meta
        if (isDynamic) {
            const {name} = route
            router.removeRoute(name as string)
        }
    })
}

export default router
