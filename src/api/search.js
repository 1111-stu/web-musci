import http from "utils/request.js"

//通过搜索关键词，获取音乐/歌单/歌手
export const getSearchResult = (params) =>{
    return http ({
        // url:`/search`,
        url:`/cloudsearch`,
        params:params
    })
}