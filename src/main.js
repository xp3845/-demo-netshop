//引入初始化样式文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

//定义全局指令
app.directive('img-lazy',{
    mounted(el, binding){

    //el: 指令绑定的元素 img
    //bingding:binding.value 指令等于号后面的值，这里是图片地址url
    console.log(el, binding.value)
    const { stop } = useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          console.log(isIntersecting)
          if (isIntersecting) {
            // 进入视口区域
            el.src = binding.value
            stop()
          }
        },
      )
    }
});