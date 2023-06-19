import {
    deleteData, executeSql,
    getDashBoard,
    getDBConnectionId,
    getNewColTree,
    getSimpleAndEasy,
    listTableDatas
} from "@/api/dataServer/dbOperate";
import {reactive} from "vue";
import * as echarts from "echarts/core";

const state = reactive({
    serverId: '',
    dbName: '',
    dbId: '',
    tableName: '',
    columnName: '',
    dbConnectionId: -1,
    schema: '',
    option1: {} as any,
    option2: {} as any,
    option3: {} as any,
    option4: {} as any,
    option5: {} as any,
    ts: 0,
    connect: '',
})
//pzx
const categories2 = (function () {
    const res = [];
    let len = 10;
    while (len--) {
        // @ts-ignore
        res.push(10 - len - 1);
    }
    return res;
})();
const categories3 = (function () {
    const res = [];
    let len = 10;
    while (len--) {
        // @ts-ignore
        res.push(10 - len - 1);
    }
    return res;
})();
const active: number[] = [0,0,0,0,0,0,0,0,0,0];
const commits: number[] = [0,0,0,0,0,0,0,0,0,0];
const deletes: number[] = [0,0,0,0,0,0,0,0,0,0];
const fetched: number[] = [0,0,0,0,0,0,0,0,0,0];
const hits: number[] = [0,0,0,0,0,0,0,0,0,0];
const idle: number[] = [0,0,0,0,0,0,0,0,0,0];
const inserts: number[] = [0,0,0,0,0,0,0,0,0,0];
const reads: number[] = [0,0,0,0,0,0,0,0,0,0];
const returned: number[] = [0,0,0,0,0,0,0,0,0,0];
const rollbacks: number[] = [0,0,0,0,0,0,0,0,0,0];
const totaled: number[] = [0,0,0,0,0,0,0,0,0,0];
const transaction: number[] = [0,0,0,0,0,0,0,0,0,0];
const updates: number[] = [0,0,0,0,0,0,0,0,0,0];
const editConfigs = reactive({
    data:[],
    types:['','',''],
    options:{},
})
//获取父级方法
export function getParentNode(row,num:number) {
    for (let i = 0;i < num;i++){
        row = row.parent
    }
    return row
}
//左右键点击后获取到特定数据并保存
export async function nativeTreeClickData(row,type) {
    if (type === 'center'){
        (row.level >= 2 && row.level < 4) && (state.serverId = getParentNode(row, row.level - 2).data.id);
        (row.level >= 4 && row.level < 6) && (state.serverId = getParentNode(row, row.level - 2).data.id,
            state.dbName = getParentNode(row, row.level - 4).data.name,
            state.dbId = getParentNode(row, row.level - 4).data.id);
        (row.level >= 6) && (state.serverId = getParentNode(row, row.level - 2).data.id,
            state.dbName = getParentNode(row, row.level - 4).data.name,
            state.dbId = getParentNode(row, row.level - 4).data.id,
            state.tableName = getParentNode(row, row.level - 6).data.name);
    }else if (type === 'local'){
        (row.level >= 3 && row.level< 5) && (state.serverId = getParentNode(row, row.level - 3).data.id);
        (row.level >= 5 && row.level< 9) && (state.serverId = getParentNode(row, row.level - 3).data.id,
            state.dbId = getParentNode(row, row.level - 5).data.id,
            state.dbName = getParentNode(row, row.level - 5).data.name);
        (row.level >= 9 && row.level< 11) && (state.serverId = getParentNode(row, row.level - 3).data.id,
            state.dbId = getParentNode(row, row.level - 5).data.id,
            state.dbName = getParentNode(row, row.level - 5).data.name,
            state.tableName = getParentNode(row, row.level - 9).data.name);
        (row.level >= 11) && (state.serverId = getParentNode(row, row.level - 3).data.id,
            state.dbId = getParentNode(row, row.level - 5).data.id,
            state.dbName = getParentNode(row, row.level - 5).data.name,
            state.tableName = getParentNode(row, row.level - 9).data.name,
            state.columnName = getParentNode(row, row.level - 11).data.name);
        if (row.data.type==='schema'){
            state.schema = getParentNode(row, row.level - 7).data.name
        }
    }else if (type === 'simple'){
        (row.level >= 2 && row.level< 3) && (state.serverId = getParentNode(row, row.level - 2).data.id);
        (row.level >= 3 && row.level< 4) && (
            state.serverId = getParentNode(row, row.level - 2).data.id,
            state.dbId = getParentNode(row, row.level - 3).data.id,
                state.schema = getParentNode(row, row.level - 3).data.name);
        (row.level >= 4 && row.level< 6) && (
            state.serverId = getParentNode(row, row.level - 2).data.id,
            state.dbId = getParentNode(row, row.level - 3).data.id,
            state.tableName = getParentNode(row, row.level - 5).data.name,
            state.schema = getParentNode(row, row.level - 3).data.name);
    }
    if (type === 'local' &&  row.data.type==='server'){
        await getDBConnectionId("",state.serverId).then((data)=>{
            // @ts-ignore
            if (data.message === '连接超时！'){
                state.connect = '-10'
            }else {
                state.dbConnectionId = data.data
            }
        })
    }else if (type === 'local' && ( row.level === 8 || row.level === 9)){
        await getDBConnectionId(state.dbName,state.serverId).then((data)=>{
            // @ts-ignore
            if (data.message === '连接超时！'){
                state.connect = '-10'
            }else {
                state.dbConnectionId = data.data
            }
        })
    }else if(type === 'simple' && row.data.type === 'server'){
        await getDBConnectionId('',state.serverId).then((data)=>{
            // @ts-ignore
            if (data.message === '连接超时！'){
                state.connect = '-10'
            }else {
                state.dbConnectionId = data.data
            }
        })
    }  else {
        state.connect = ''
    }
    const dataAssemble = [state.serverId,state.dbName,state.dbId,state.tableName,state.columnName,state.dbConnectionId,state.schema,state.connect]
    return dataAssemble
}
//打开dialog方法
export function openDialogType(type,data){

}
//树节点公共方法
export function treeNodePublic(keyValues,row){
    console.log(keyValues)
    const urlKayValue = [] as any
    for (let i = 0;i < keyValues.length;i++){
        (keyValues[i] === 'gid') && (urlKayValue.push({
            keys:keyValues[i]+'='+row.data.id
        }));
        (keyValues[i] === 'fdwId') && (urlKayValue.push({
            keys:keyValues[i]+'='+getParentNode(row,row.level-7).data.oid
        }));
        (keyValues[i] === 'srvId') && (urlKayValue.push({
            keys:keyValues[i]+'='+getParentNode(row,row.level-9).data.oid
        }));
        (keyValues[i] === 'serverId') && (urlKayValue.push({
            keys:keyValues[i]+'='+state.serverId
        }));
        (keyValues[i] === 'dbConnectionId') && (urlKayValue.push({
            keys:keyValues[i]+'='+state.dbConnectionId
        }));
        (keyValues[i] === 'dbId') && (urlKayValue.push({
            keys:keyValues[i]+'='+state.dbId
        }));
        (keyValues[i] === 'tableName') && (urlKayValue.push({
            keys:keyValues[i]+'='+state.tableName
        }));
        (keyValues[i] === 'schema') && (urlKayValue.push({
            keys:keyValues[i]+'='+state.schema
        }));
    }
    for (let i =0;i<urlKayValue.length;i++){
        urlKayValue[i] = urlKayValue[i].keys
    }
    return urlKayValue
}
//树数据公共方法
export function treeDataPublic(ferryData,row){
    for (let i = 0; i < ferryData.data.length; i++) {
        if (row.data.type === 'server'){
            for (let j = 0; j< ferryData.data[0].children.length; j++){
                if (ferryData.data[0].children[j].type === "db" && ferryData.data[0].children[j].dbConnectionId===null){
                    ferryData.data[0].children[j].icon = 'databasebad'
                }
            }
        }else if(row.data.type === 'server_group'){
            if (ferryData.data[i].type === "server" && ferryData.data[i].dbConnectionId===null){
                ferryData.data[i].icon = 'serverbad'
            }
        }
    }
    return ferryData
}
//生成本地树
export async function addTreeLevel(methodName:string,keyValues:[],row,type){
    let ferryData = [] as any
    let urlKayValue = [] as any
    urlKayValue = await treeNodePublic(keyValues,row)
    console.log(type)
    if (type === 'simple'){
        // @ts-ignore
        await getSimpleAndEasy(methodName,urlKayValue).then((data)=>{
            ferryData = treeDataPublic(data,row)
        })
    }else {
        // @ts-ignore
        await getNewColTree(methodName,urlKayValue).then((data)=>{
            ferryData = treeDataPublic(data,row)
        })
    }
    return ferryData
}

//页面左右拉动
export function dragController(resize,left,mid,box){
    for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function (e) {
            //颜色改变提醒
            resize[i].style.background = '#818181';
            const startX = e.clientX;
            resize[i].left = resize[i].offsetLeft;
            // 鼠标拖动事件
            document.onmousemove = function (e) {
                const endX = e.clientX;
                let moveLen = resize[i].left + (endX - startX); // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
                const maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

                if (moveLen < 32) moveLen = 32; // 左边区域的最小宽度为32px
                if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px

                resize[i].style.left = moveLen; // 设置左侧区域的宽度

                for (let j = 0; j < left.length; j++) {
                    left[j].style.width = moveLen + 'px';
                    mid[j].style.width = (box[i].clientWidth - moveLen - 10) + 'px';
                }
            };
            // 鼠标松开事件
            document.onmouseup = function (evt) {
                //颜色恢复
                resize[i].style.background = '#d6d6d6';
                document.onmousemove = null;
                document.onmouseup = null;
                resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
            };
            resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
            return false;
        };
    }
}

//仪表盘
export function dataDashBord(myChart1,myChart2,myChart3,myChart4,myChart5,timer){
    let count = 10;
    dashOption()
    timer = setInterval(function () {
        getDashBoard(state.dbName,state.serverId,state.dbConnectionId).then((data)=>{
            editConfigs.data = data.data
            editConfigs.options = state.option2
            editConfigs.types = ['active','total','idle']
            active.shift();
            active.push(data.data.active);
            commits.shift();
            commits.push(data.data.commits);
            deletes.shift();
            deletes.push(data.data.delete);
            fetched.shift();
            fetched.push(data.data.fetched);
            hits.shift();
            hits.push(data.data.hits);
            idle.shift();
            idle.push(data.data.idle);
            inserts.shift();
            inserts.push(data.data.inserts);
            reads.shift();
            reads.push(data.data.reads);
            returned.shift();
            returned.push(data.data.returned);
            totaled.shift();
            totaled.push(data.data.total);
            rollbacks.shift();
            rollbacks.push(data.data.rollbacks);
            transaction.shift();
            transaction.push(data.data.transaction);
            updates.shift();
            updates.push(data.data.updates);
            categories2.shift();
            // @ts-ignore
            categories2.push(count++);
            // @ts-ignore
            myChart1.setOption<echarts.EChartsOption>({
                xAxis: [
                    {
                        data: categories2
                    }
                ],
                series: [
                    {
                        data: totaled
                    },
                    {
                        data: active
                    },
                    {
                        data: idle
                    }
                ]
            });
            // @ts-ignore
            myChart2.setOption<echarts.EChartsOption>({
                xAxis: [
                    {
                        data: categories2
                    }
                ],
                yAxis: [
                    {
                        max: transaction[0]
                    }
                ],
                series: [
                    {
                        data: transaction
                    },
                    {
                        data: commits
                    },
                    {
                        data: rollbacks
                    }
                ]
            });
            // @ts-ignore
            myChart3.setOption<echarts.EChartsOption>({
                xAxis: [
                    {
                        data: categories2
                    }
                ],
                yAxis: [
                    {
                        max: inserts[0]
                    }
                ],
                series: [
                    {
                        data: inserts
                    },
                    {
                        data: updates
                    },
                    {
                        data: deletes
                    }
                ]
            });
            // @ts-ignore
            myChart4.setOption<echarts.EChartsOption>({
                xAxis: [
                    {
                        data: categories2
                    }
                ],
                yAxis: [
                    {
                        max: returned[0]
                    }
                ],
                series: [
                    {
                        data: fetched
                    },
                    {
                        data: returned
                    },
                ]
            });
            // @ts-ignore
            myChart5.setOption<echarts.EChartsOption>({
                xAxis: [
                    {
                        data: categories2
                    }
                ],
                yAxis: [
                    {
                        max: hits[0]
                    }
                ],
                series: [
                    {
                        data: reads
                    },
                    {
                        data: hits
                    },
                ]
            });
        })

    }, 1500);
    myChart1.setOption(state.option1,true);
    myChart2.setOption(state.option2,true);
    myChart3.setOption(state.option3,true);
    myChart4.setOption(state.option4,true);
    myChart5.setOption(state.option5,true);
    return timer
}
//仪表盘配置项
export function dashOption(){
    state.option1 = {
        title: {
            text: '服务器会话',
            textStyle: {
                fontSize: 12
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'red'
                }
            }
        },
        legend: {},
        grid: {
            left: '10%',
            right: '15%',
            bottom: '10%',
            top: '15%',
            width: 'auto',
            height: 'auto',
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories2,
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 50,
                min: 0,
                boundaryGap: [0.1, 0.1]
            },
        ],
        series: [
            {
                name: 'Total',
                type: 'line',
                data: totaled
            },
            {
                name: 'Active',
                type: 'line',
                data: active
            },
            {
                name: 'Idle',
                type: 'line',
                data: idle
            }
        ]
    };
    state.option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'red'
                }
            }
        },
        legend: {},
        grid: {
            left: '10%',
            right: '15%',
            bottom: '10%'
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories3,
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 50,
                min: 0,
                boundaryGap: [0.1, 0.1]
            },
        ],
        series: [
            {
                name: 'Transaction',
                type: 'line',
                data: transaction
            },
            {
                name: 'Commits',
                type: 'line',
                data: commits
            },
            {
                name: 'Rollbacks',
                type: 'line',
                data: rollbacks
            }
        ]
    };
    state.option3 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'red'
                }
            }
        },
        legend: {},
        grid: {
            left: '10%',
            right: '15%',
            bottom: '10%'
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories2,
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 50,
                min: 0,
                boundaryGap: [0.1, 0.1]
            },
        ],
        series: [
            {
                name: 'inserts',
                type: 'line',
                data: inserts
            },
            {
                name: 'updates',
                type: 'line',
                data: updates
            },
            {
                name: 'deletes',
                type: 'line',
                data: deletes
            }
        ]
    };
    state.option4 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'red'
                }
            }
        },
        legend: {},
        grid: {
            left: '18%',
            right: '15%',
            bottom: '10%'
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories2,
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 50,
                min: 0,
                boundaryGap: [0.1, 0.1]
            },
        ],
        series: [
            {
                name: 'fetched',
                type: 'line',
                data: fetched
            },
            {
                name: 'returned',
                type: 'line',
                data: returned
            },
        ]
    };
    state.option5 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: 'red'
                }
            }
        },
        legend: {},
        grid: {
            left: '15%',
            right: '15%',
            bottom: '10%'
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: categories2,
                show: false
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Price',
                max: 50,
                min: 0,
                boundaryGap: [0.1, 0.1]
            },
        ],
        series: [
            {
                name: 'reads',
                type: 'line',
                data: reads
            },
            {
                name: 'hits',
                type: 'line',
                data: hits
            },
        ]
    };
}

//打开表、表结果公共方法
export async function openTable(dbConnectionId,tableName,pageSize,pageNum){
    let tableFromPublic = [] as any
    const tableColumn = [] as any
    let tableData = [] as any
    let total = 0
    let loading = true
    await listTableDatas(dbConnectionId,tableName,pageSize,pageNum).then(({data}) => {
        const column= JSON.parse(data.columns)[0]
        if (tableColumn.length === 0){
            for (let i = 0 ;i < column.length;i++){
                if (column[i].checkbox===true){
                    column[i].checkbox = 'checkbox'
                }
                tableColumn.push({
                    field: column[i].field,
                    label: column[i].field,
                    checkbox: column[i].checkbox,
                    editor: column[i].editor,
                    text: column[i].text,
                    sortable: column[i].sortable,
                    title: column[i].title,
                    align: "center",
                })
            }
        }
        if (data.result.length !== 0){
            tableData = data.result
            total = data.totalCount
            loading = false
            tableFromPublic = [JSON.parse(JSON.stringify(tableColumn)),JSON.parse(JSON.stringify(tableData)),loading,total]
        }else {
            loading = false
            tableFromPublic = [JSON.parse(JSON.stringify(tableColumn)),JSON.parse(JSON.stringify(tableData)),loading,total]
        }
    })
    return tableFromPublic
}
//仪表盘表格表头
export function dashBoardTableColumns(){
    return [
        {
            align: 'center',
            field: 'pid',
            label: 'pid',
            title: 'PID',
        },
        {
            align: 'center',
            field: '',
            label: '',
            title: '数据库',
        },
        {
            align: 'center',
            field: 'username',
            label: 'username',
            title: '用户',
        },
        {
            align: 'center',
            field: 'application_name',
            label: 'application_name',
            title: '应用程序',
        },
        {
            align: 'center',
            field: 'client_addr',
            label: 'client_addr',
            title: '客户端',
        },
        {
            align: 'center',
            field: 'backend_start',
            label: 'backend_start',
            title: '后台启动',
        },
        {
            align: 'center',
            field: '',
            label: '',
            title: 'Transaction start',
        },
        {
            align: 'center',
            field: 'state',
            label: 'state',
            title: '状态',
        },
        {
            align: 'center',
            field: 'wait_event',
            label: 'wait_event',
            title: '等待事件',
        },
        {
            align: 'center',
            field: 'selectPid',
            label: 'selectPid',
            title: '数据块PID',
        },
    ]
}
//组件库表头
export function componentLibraryTableColumns(){
    return [
        {
            align: 'center',
            checkbox: 'checkbox',
            field: '',
            label: '',
            title: '',
            width: 60,
        },
        {
            align: 'center',
            field: 'name',
            label: 'name',
            title: '名称',
        },
        {
            align: 'center',
            field: 'descInfo',
            label: 'descInfo',
            title: '组件描述',
        },
        {
            align: 'center',
            field: 'status',
            label: 'status',
            title: '组件状态',
        },
        {
            align: 'center',
            field: 'isDepend',
            label: 'isDepend',
            title: '是否依赖组件',
        },
        {
            align: 'center',
            field: 'creator',
            label: 'creator',
            title: '创建人',
        },
        {
            align: 'center',
            field: 'createTime',
            label: 'createTime',
            title: '创建时间',
        },
        {
            align: 'center',
            field: 'remark',
            label: 'remark',
            title: '备注',
        },
    ]
}

//树删除方法
export async function deleteNode(treeType,item2,rowData,getData) {
    const val = [] as any
    if (treeType==='local'){
        (item2 !== 'table' && item2 !== 'column') && (await deleteData(rowData.data.id, getData[5]).then((data) => {
            val[0] = 'refresh'
        }))
    }else if (treeType==='simple'){
        (item2 !== 'table' && item2 !== 'column') && (await deleteData(rowData.data.id, getData[2]).then((data) => {
            if (item2 === 'server_group'){
                val[0] = 'server_group_refresh'
            }else {
                val[0] = 'refresh'
            }
        }))
    };
    if (item2 === 'table') {
        const val = [] as any
        val[0] = 'DROP TABLE ' + rowData.data.name
    } else if (item2 === 'column') {
        const val = [] as any
        val[0] = 'ALTER TABLE IF EXISTS public.' + getParentNode(rowData, rowData.level - 9).data.name + ' DROP COLUMN IF EXISTS ' + rowData.data.name
    }
    return val
}
