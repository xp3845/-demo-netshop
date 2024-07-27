//封装分类数据业务相关代码
import { getCategoryAPI } from "@/apis/category"
import { ref, onMounted } from "vue"
import { useRoute,onBeforeRouteUpdate } from "vue-router"

export function useCategory() {
    const categoryData = ref({});
    const route = useRoute();
    //传入分类id，第一次进入to对象为空（没点），故设置默认值
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id);
        categoryData.value = res.result;
    }

    onMounted(() => getCategory())

    // 路由参数变化 分类数据接口重新发送
    // 参数to为目标路由，调用params.id获取目标分类id
    onBeforeRouteUpdate((to) => {
        getCategory(to.params.id)
    })

    return{
        categoryData
    }
}