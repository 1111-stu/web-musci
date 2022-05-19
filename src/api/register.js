import http from "utils/request.js"

//校验手机号是否已经注册过
export const getCaptcha = (params) =>{
    return http ({
        url:`/cellphone/existence/check`,
        params:params
    })
}
 //发送验证码
export const sentCaptcha = (params)=>{
    return http ({
        url:`/captcha/sent`,
        params:params
    })
}
 //注册网易云账号
 export const register = (params)=>{
     return http({
         url:`/register/cellphone`,
         params:params
     })
 }