import {defineComponent, defineProps, ref} from "vue";

interface props {
    b: string
}

const DynamicMenus = defineComponent({
    props: {
        b: Number
    },
    setup(props) {
        const a = ref(0)

        return () => (
            <>

                <el-button type="primary" v-slots={{
                    reference: () => <div>这里是普通内容</div>,
                    default: () => <div>这里是悬浮之后，弹出的提示框的内容</div>
                }}
                >
                    {a.value}
                </el-button>
            </>
        )
    }
})
export default DynamicMenus;
