<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <Listview :data=singers></Listview>
  </div>
</template>

<script>
import Header from "common/Header.vue";
import Nav from "common/Nav.vue";
import Listview from "base/Listview.vue"
import { Getinitial } from "api/singerName.js";
import Singer from "api/index/singer.js";
import {getSingerList} from "api/index/singer.js"
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers: [],
    };
  },
  created() {
    this._getSingerList();
  },
  components: {
    Header,
    Nav,
    Listview
  },
  methods: {
    //获取歌手排行数据，并调用函数进行数据处理
    async _getSingerList() {
      const res = await getSingerList({
        limit:100
      })
      if (res.code === 200) {
        this.singers = this._normalizeSinger(res.artists);
      }
      console.log(this.singers);
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          //先把排行最靠前的歌手，单独分出来，作为一个集合，push到hot的item里面
          map.hot.items.push(
            new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
            })
          );
        }
        const key = Getinitial(item.name); //获取歌手拼音的首字母，作为后边的排序使用
        if (!map[key]) {
          //如果map中没有对应的键值，则添加一个新的
          map[key] = {
            title: key,
            items: [],
          };
        }
        map[key].items.push(
          new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
          })
        );
      });
      // 为了得到有序列表，我们需要处理map
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      // concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
      return hot.concat(ret);
    },
  },
};
</script>

<style lang='less' scoped>
// *{
//   margin: 0;
//   padding: 0;
// }
// .list-item{
//   display: flex;
//   height: 60px;
//   };
// .group-item-title{
//   font-size: 14px;
//   line-height: 18px;
//   background-color:#dadbdc;
//   color: black;
//   padding-left:5px;
// }
// .avatar{
//   width: 50px;
//   height:50px;
//   border-radius: 5px;
//   margin: 4px;
// }
// .name{
//   font-size:14px;
//   color: black;
//   margin-left: 20px;
//   line-height: 54px;
//   vertical-align: center;
// }
</style>