import request from '@/utils/http'
//封装所有和用户相关的接口函数
export const loginAPI = ({account,password}) =>{
    return request({
        url:'/login',
        method:'post',
        data:{
            account,
            password
        }
    })
}