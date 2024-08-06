//管理用户数据相关
import {defineStore} from 'pinia'
import {ref} from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './carStore'
import { mergeCartAPI } from '@/apis/cart'


export const useUserStore = defineStore('user', ()=> {
    const cartStore = useCartStore()
    //定义管理用户数据的state
    const userInfo = ref({})
    //定义获取接口数据的action函数
    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({account,password})
        userInfo.value = res.result
        //合并购物车
        //map方法会遍历数组执行内部提供的函数，并返回一个新数组
        //这里是将carlist中的skuid，selected，count属性提取出来返回一个新数组，然后调用mergeCartAPI接口
        await mergeCartAPI(cartStore.carlist.map(item => {
            return {
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        cartStore.updateNewList()
    }
    //退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
        //执行清除购物车action
        cartStore.clearCart()
    }
    //以对象格式把state和action函数返回
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true //持久化存储
})