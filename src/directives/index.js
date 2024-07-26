import { useIntersectionObserver } from '@vueuse/core'

//定义懒加载插件
export const lazyPlugin = {
    install(app) {
        //懒加载指令逻辑
        //定义全局指令
        app.directive('img-lazy', {
            mounted(el, binding) {
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
    }
}