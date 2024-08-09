//封装倒计时逻辑函数
import { ref,computed, onUnmounted } from "vue"
import dayjs from "dayjs"
export const useCountDown = () => {
    //1.响应式数据
    let timer = null
    const time = ref(0)
    //格式化时间为 xx分xx秒
    const formatTime = computed(() =>{
        return dayjs.unix(time.value).format("mm分ss秒")
    })
    //2.开启倒计时的函数
    const start = (currentTime) =>{
    //开始倒计时的逻辑
    //核心逻辑：每隔1秒-1
    time.value = currentTime
    setInterval(()=>{
        time.value--
    },1000)
    }
    //组件销毁时消除定时器
    onUnmounted(()=>{
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}