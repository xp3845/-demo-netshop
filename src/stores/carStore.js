//封装购物车模块
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCartStore = defineStore('cart', () => {
    //定义state - carlist
    const carlist = ref([])
    //定义actions - addCart
    const addCart = (goods) => {
        //已添加过 count+1
        //没添加过 push
        //通过匹配传递的商品skuid是否与carlist中已有的skuid相同，来判断是否已添加过
        const item =carlist.value.find((item) => goods.skuId === item.skuId)
        if(item){
            item.count++
        }else{
            carlist.value.push(goods)
        }
    }
    //删除购物车
    const delCart = (skuId) => {
    //方法1 找到删除的下标值，然后splic
    //方法2 使用数组的过滤方法，然后filter
    const idx = carlist.value.findIndex((item) => item.skuId === skuId)
    carlist.value.splice(idx,1)

    }
    return {
        carlist,
        addCart,
        delCart
    }
},{
    persist:true
})