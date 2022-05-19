<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐歌单-->
    <header>
      <p>推荐歌单</p>
    </header>
    <div class="listBox">
      <div class="songsList" v-for="(item) in songsList" :key="item.id">
        <router-link :to="{path:'/rmdListDetail',query:{id:item.id}}">
          <dl>
            <dt><img :src="item.picUrl" alt=""></dt>
            <dd>
              <div class="playcount">
                <van-icon name="service" />
                <span>{{item.playcount}}</span>
              </div>
              <p>{{item.name}}</p>
            </dd>
          </dl>
        </router-link>
      </div>
    </div>
    <!-- 推荐歌曲-->
    <header>
      <p>推荐歌曲</p>
    </header>
    <div class="songsBox">
      <div class="songs" v-for="(item) in songs" :key="item.id">
        <dl>
          <dt><img :src="item.picUrl" alt=""></dt>
          <dd>
            <p>{{item.name}}</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "common/Header.vue";
import Nav from "common/Nav.vue";
import { changePlaycount } from "@/common/js/dataProcess.js";
import {swipe,getRecommendResource,getRecommendSongs} from "api/index/recommend.js";
export default {
  data() {
    return {
      //轮播的图片
      images: [],
      //每日推荐歌单
      songsList: [],
      //每日推荐歌曲
      songs: [],
    };
  },
  created() {
    this._getRecommendResource();
    this._getRecommendSongs();
    this._swipe();
  },
  methods: {
    //获取轮播图
    async _swipe() {
      const res = await swipe({
        type: 1,
      });
      if (res.code !== 200) {
        return this.$toast.fail("获取轮播图失败");
      }
      for (let item = 0; item < res.banners.length; item++) {
        this.images.push(res.banners[item].pic);
      }
    },
    //获取每日推荐歌单
    async _getRecommendResource() {
      const res = await getRecommendResource();
      if (res.code !== 200) {
        return this.$toast.fail("获取每日推荐失败");
      }
      this.songsList = res.recommend;
      //处理歌单的播放数据
      for(let i=0;i<this.songsList.length-1;i++){
        this.songsList[i].playcount = changePlaycount(this.songsList[i].playcount)
      }
    },
    //获取每日推荐歌曲
    async _getRecommendSongs() {
      const res = await getRecommendSongs();
      if (res.code !== 200) {
        return this.$toast.fail("获取每日推荐歌曲失败");
      }
      for (let item = 0; item < res.data.dailySongs.length; item++) {
        this.songs.push(res.data.dailySongs[item].al);
      }
      console.log(this.songs);
    },
  },
  components: {
    Header,
    Nav,
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.van-swipe-item {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  img {
    width: 350px;
    height: 200px;
    border-radius: 5px;
  }
}

header p {
  font-size: 18px;
  color: black;
  margin-top: 6px;
  margin-left: 6px;
}
// 推荐歌单
.listBox {
  width: 375px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .songsList {
    position: relative;
    width: 110px;
    margin: 10px 7.5px;
    img {
      position: relative;
      width: 110px;
      height: 110px;
      border-radius: 5px;
    }
    .playcount {
      position: absolute;
      color: white;
      font-size: 10px;
      top: 2px;
      right: 2px;
    }
    p {
      font-size: 10px;
      line-height: 14px;
      text-align: center;
      color: black;
      width: 110px;
    }
  }
}
// 推荐歌曲
.songsBox {
  width: 375px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .songs {
    width: 110px;
    margin: 10px 7.5px;
    img {
      width: 110px;
      height: 110px;
      border-radius: 5px;
    }
    p {
      font-size: 10px;
      line-height: 14px;
      text-align: center;
      color: black;
      width: 110px;
    }
  }
}
</style>