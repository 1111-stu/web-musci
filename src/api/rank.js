import http from "utils/request.js"

// 获取所有排行榜单详情
export const toplistDetail = () => {
    return http ({
        url:`/toplist/detail`
    })
}