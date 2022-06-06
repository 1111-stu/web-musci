import http from "utils/request"

//获取歌曲的歌词
export const getMusciLyric = (params)=>{
    return http({
        url:"/lyric",
        params:{
            id:params
        }
    })
}