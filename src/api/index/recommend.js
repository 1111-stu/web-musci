import http from "utils/request";

//获取轮播图
export const swipe = (params) => {
    return http({
        url: `/banner`,
        params: params
    })
};
//获取推荐歌单
export const getRecommendResource = () => {
    return http({
        url: `/recommend/resource`,
    })
};
//获取每日推荐歌曲
export const getRecommendSongs = () => {
    return http({
        url: `/recommend/songs`
    })
};