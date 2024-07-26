import httpInstance from '@/utils/http'

export function getBannerAPI(){
    return httpInstance({
        url: '/home/banner'
    })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () =>{
    return httpInstance({
        url: '/home/new'
    })
}