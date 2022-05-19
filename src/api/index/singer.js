import http from "utils/request"
export default class Singer {
    constructor({ id, name, avatar }) {
      this.id = id;
      this.name = name;
      this.avatar = avatar;
    }
  }
  //获取歌手排行数据，并调用函数进行数据处理
export const getSingerList = (params) => {
    return http({
        url:`/top/artists`,
        params:params
    })
}