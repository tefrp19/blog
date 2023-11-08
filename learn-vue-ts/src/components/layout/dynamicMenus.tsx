import {defineComponent, onBeforeMount, watch,} from "vue";
import {useAppStore} from "../../store";
import {RouteRecordRaw} from "vue-router";
import {addRoutes, RouteRecordRawPlus} from "../../router";

const DynamicMenus = defineComponent({
    props: {
        b: Number
    },
    setup() {
        const appStore = useAppStore()
        // 渲染一级菜单
        const renderMenuItem = (route: RouteRecordRawPlus) => {
            return (
                // <router-link to={route.menuPath ? route.menuPath : route.path}>
                    <el-menu-item index={route.menuPath ? route.menuPath : route.path}>
                        <el-icon>
                            <Menu/>
                        </el-icon>
                        {route.meta?.title}
                    </el-menu-item>
                // </router-link>
            )
        }

        // 渲染子级菜单
        const renderSubMenu = (route: RouteRecordRaw) => {
            return (
                <el-sub-menu index={route.path} v-slots={{
                    title: () => (
                        <>
                            <el-icon>
                                <location/>
                            </el-icon>
                            <span>{route.meta?.title}</span>
                        </>
                    ),
                }}>
                    {
                        // 递归渲染
                        route.children?.map(child => {
                            if (child.meta?.isSubMenu) return renderSubMenu(child)
                            else return renderMenuItem(child)
                        })
                    }
                </el-sub-menu>
            )

        }

        return () => (
            <>
                <el-menu
                    default-active="/home"
                    class="el-menu-vertical-demo"
                    router={true}
                >
                    {
                        appStore.routes.map(route => {
                            if (route.meta?.isMenu) {
                                if (route.meta?.isSubMenu) {
                                    return renderSubMenu(route)
                                } else {
                                    return renderMenuItem(route)
                                }
                            }
                        })
                    }
                </el-menu>
            </>
        )
    }
})
export default DynamicMenus;
