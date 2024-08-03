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
    return {
        carlist,
        addCart
    }
},{
    persist:true
})