import http from "utils/request"
//获取歌单详情
export const getListDetailinfo =(params)=>{
    return http({
        url: `/playlist/detail`,
        params:params
    })
}
//获取歌单所有歌曲
export const getListSongs =(params)=>{
    return http({
        url: `/playlist/track/all`,
        params:params
    })
}
















getListSongs