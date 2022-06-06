<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <!-- 排行榜列表 -->
    <div class="toplist-box">
      <!-- 官方榜单 -->
      <div v-for="(item,index) in toplist" :key="index" class="toplist" @click="toSongs(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <div class="tracks">
            <p v-for="(track,i) in item.tracks" :key="i" v-show="item.tracks">
              {{i+1}}
              {{track.first}}
            </p>
          </div>
      </div>
      <!-- 更多榜单 -->
      <div class="moreToplist">
        <img :src="item.coverImgUrl" alt="" v-for="(item,index) in moreToplist" :key="index">
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../common/Header.vue";
import Nav from "../../common/Nav.vue";
import {toplistDetail } from "api/rank.js";
export default {
  data() {
    return {
      toplist: [],
      moreToplist: [],
      //排行榜也是一种歌单，传入id可以获取歌单列表
      Songs: [],
      id: "5453912201",
    };
  },
  created() {
    this._toplistDetail();
  },
  methods: {
    // 获取排行榜单详情
    async _toplistDetail() {
      const res = await toplistDetail();
      if (res.code === 200) {
        for (let i = 0; i < 4; i++) {
          this.toplist.push(res.list[i]);
        }
        for (let i = 4; i < res.list.length; i++) {
          this.moreToplist.push(res.list[i]);
        }
      }
    },
    toSongs(id){
      this.$router.push({path:'/toplistSongs',query:{id:id}})
    }
  },
  components: {
    Header,
    Nav,
  },
};
</script>

<style lang='less' scoped>
.toplist-box {
  width: 100%;
  font-size: 0.4rem;
  .toplist {
    display: flex;
    margin: 0.2667rem 0.4rem;
    border-bottom: 2px solid #e1e2e2;
    img {
      width: 2.6667rem;
      height: 2.6667rem;
      border-radius: 0.1333rem;
      margin-bottom: 0.2667rem;
    }
    .tracks {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 0.4rem;
    }
  }
  .moreToplist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    img {
      width: 30%;
      margin: 0.2667rem 0.1333rem;
    }
  }
}
</style>