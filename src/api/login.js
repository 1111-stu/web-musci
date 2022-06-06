import http from '@/utils/request' //导入request.js的axios配置
export const login = (params) => {
    return http ({
        method:'post',
        url:'/login/cellphone',
        params:params
    })
}