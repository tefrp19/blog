const data = {
    id: 1,
    data: {},
    children: [
        {
            id: 2,
            data: {},
            children: [
                {
                    id: 3,
                    data: {},
                }
            ]
        },
        {
            id: 4,
            data: {},
            children: [
                {
                    id: 5,
                    data: {},
                }
            ]
        },
        {
            id: 6,
            data: {},
        }

    ]
}
// 遍历树，为每个节点添加key属性
const preDfs = (root) => {
    const dfs = (node) => {
        if (!node) return
        // 执行对每个节点的操作
        node.key = node.id
        if (node.children) {
            for (const item of node.children) {
                dfs(item)
            }
        }
    }
    dfs(root)
}
preDfs(data)
console.log(data);
