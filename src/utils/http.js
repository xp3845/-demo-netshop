import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'

//创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 30*1000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
   //从pinia中获取token数据
   const userStore = useUserStore()
   //拼接token数据
   const token = userStore.userInfo.token
   if (token) {
     config.headers.Authorization = `Bearer ${token}`
   }
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  //统一错误提示
  ElMessage({
    type:"warning",
    message: e.response.data.message
  })
    return Promise.reject(e)
  })

  // 导出axios实例,使api文件可以直接import实例封装
export default httpInstance

//export default 默认导出
//默认导出允许你导出一个默认值，每个模块只能有一个默认导出。导入时可以使用任何名称。
//export 命名导出
//命名导出允许你导出多个值，每个导出都有一个名称。导入时需要使用相同的名称。
/*
httpInstance.interceptors.request.use(
  // 第一个回调函数，在请求发送前执行
  function (config) {
    // 对请求配置做点什么
    // 例如：添加请求头、认证信息等
    return config;
  },
  // 第二个回调函数，在请求失败时执行
  function (error) {
    // 对请求错误做点什么
    return Promise.reject(error);
  }
);

// ES6语法简化写法
httpInstance.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

*/


/*

  httpInstance（axios实例名）.interceptors.response.use(响应拦截器)(
    // 第一个回调函数，在响应成功时执行
    function (response) {
      // 对响应数据做点什么
      return response;
    },
    //es6语法为 (response) => { return response.data }
    //简洁写法 response => response.data
    // 第二个回调函数，在响应失败时执行
    function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  //es6语法为 (error) => { Promise.reject(error) }
  */