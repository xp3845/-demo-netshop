//把components文件夹下的所有组件都进行全局化注册
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
export const componentPlugin = {
    install (app){
        // app.component('组件名', 组件对象)
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', Sku)
    }
}