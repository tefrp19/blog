const userPermissions = ["createUser"]
export const createPermissionDirective = (app) => {
    app.directive('permission', (el, binding) => {
        console.log(el, "el")
        const {value} = binding
        console.log(value, "value")
        if (userPermissions.includes(value)) {
            console.log("有权限")
        } else {
            console.log("没有权限，删除使用v-permission指令的组件的真实dom")
            el.parentNode && el.parentNode.removeChild(el)
        }
    })
}