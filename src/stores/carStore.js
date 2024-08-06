//封装购物车模块
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI,delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //定义state - carlist
    const carlist = ref([])

     //获取最新购物车列表action
     const updateNewList = async() => {
        const res = await findNewCartListAPI()
        carlist.value = res.result
    }

    //定义actions - addCart
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            //登录之后的加入购物车逻辑
            await insertCartAPI({ skuId, count })
            updateNewList()
        } else {
            //未登录本地逻辑
            //已添加过 count+1
            //没添加过 push
            //通过匹配传递的商品skuid是否与carlist中已有的skuid相同，来判断是否已添加过
            const item = carlist.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                carlist.value.push(goods)
            }
        }
    }
    //删除购物车
    const delCart = async(skuId) => {
        if (isLogin.value) {
            //登录之后的删除购物车逻辑
           await delCartAPI([skuId])
           updateNewList()
        } else {
            //方法1 找到删除的下标值，然后splic
            //方法2 使用数组的过滤方法，然后filter
            const idx = carlist.value.findIndex((item) => item.skuId === skuId)
            carlist.value.splice(idx, 1)
        }
    }

    //清除购物车
    const clearCart = () => {
        carlist.value = []
    }

    //计算属性
    //1.总数量 2.总价格 3.已选择数量 4.已选择总价
    //reduce用于将数组长度缩减为1，初始值0，a为累加器，用于保存累加结果，c为当前元素，最终返回累加和
    const allCount = computed(() => carlist.value.reduce((a, c) => a + c.count, 0))
    //逻辑类似，将原来的数量累加逻辑变为 单价*数量=总价格 
    const allPrice = computed(() => carlist.value.reduce((a, c) => a + c.count * c.price, 0))
    //filter方法用于过滤数组，返回满足条件的元素组成的新数组，这里用于筛选出已选中的商品
    const selectedCount = computed(() => carlist.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))

    const selectedPrice = computed(() => carlist.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    //单选功能
    const singleCheck = (skuId, selected) => {
        //通过skuId找到要修改的那一项，然后修改它的selected属性
        const item = carlist.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    //全选功能
    const allCheck = (selected) => {
        //遍历carlist，修改每一项的selected属性为当前全选框状态
        carlist.value.forEach(item => item.selected = selected)
    }

    //是否全选
    //every方法用于判断数组中每一项是否都满足条件(这里判断是否都为true)，返回布尔值
    const isAll = computed(() => carlist.value.every((item) => item.selected))

    return {
        carlist,
        addCart,
        delCart,
        clearCart,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        singleCheck,
        isAll,
        allCheck
    }
}, {
    persist: true
})