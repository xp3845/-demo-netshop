import httpInstance from '@/utils/http'

export function getCategory(){
    return httpInstance({
        url:'home/category/head'
    })
}//返回指定url的一个promise对象