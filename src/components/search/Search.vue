<template>
  <div>
    <div class="search-top">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <input type="text" placeholder="搜索歌曲、歌手" v-model="searchKey" @keydown.enter="postKey">
    </div>
    <div class="search-history">
      <ul>
        <li class="title">
          <p>搜索历史</p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanchu" @click="removeAll"></use>
          </svg>
        </li>
        <li v-for="(item,index) in keywordList" :key="index" @click="_getSearchResult(item)">
          <p>{{item}}</p>
          <svg class="icon" aria-hidden="true" @click="removeItem(index)">
            <use xlink:href="#icon-shachu-xue"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="searchSongs-box">
      <div class="songs" v-for="(song,index) in searchSongs" :key="index" @click="playMusci(song)">
        <div class="left">
          <div class="left-index">
            <span>{{index+1}}</span>
          </div>
          <!-- 歌名和作者 -->
          <div class="left-content">
            <p>{{song.al.name}}</p>
            <span v-for="(author,arIndex) in song.ar" :key="arIndex" id="author">{{author.name}}</span>
          </div>
        </div>
        <!-- 歌曲列表右侧图标 -->
        <div class="right">
          <van-icon name="video-o" v-if="song.mv!=0" />
          <van-icon name="wap-nav" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { getSearchResult } from "api/search.js";
export default {
  data() {
    return {
      keywordList: [],
      searchKey: "",
      searchSongs: [],
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  mounted() {
    // 每次渲染页面之前,localStorage有值拿到缓存的数据,没值赋值一个空数组
    this.keywordList = JSON.parse(localStorage.getItem("keywordList"))
      ? JSON.parse(localStorage.getItem("keywordList"))
      : [];
  },
  methods: {
    postKey() {
      //输入内容不能为空
      if (this.searchKey != "") {
        //传入关键词，从后台获取数据
        this._getSearchResult(this.searchKey);
        //最新的记录应该添加到数组的最前面
        this.keywordList.unshift(this.searchKey);
        //去重 Set()返回一个对象，...将返回的对象变成参数序列，[]再把参数序列变成数组
        this.keywordList = [...new Set(this.keywordList)];
        if (this.keywordList.length > 10) {
          this.keywordList.splice(this.keywordList.length - 1, 1);
        }
        //把数据保存到localStorage里面
        localStorage.setItem("keywordList", JSON.stringify(this.keywordList));
        this.searchKey = "";
      }
    },
    //输入关键词，从后台获取结果
    async _getSearchResult(keyword) {
      const res = await getSearchResult({ keywords: keyword });
      this.searchSongs = res.result.songs;
      // console.log(this.searchSongs)
    },
    //删除所有历史记录
    removeAll() {
      this.$dialog
        .confirm({
          title: "全部删除",
          message: "确定要删除全部历史记录吗？",
        })
        .then(() => {
          localStorage.removeItem("keywordList");
          this.keywordList = [];
        })
        .catch(() => {});
    },
    //获取下标，删除指定条历史记录
    removeItem(i) {
      //根据数组下标删除指定历史记录
      this.keywordList.splice(i, 1);
      //删除后localStrorage重新获取keywordList的值
      localStorage.setItem("keywordList", JSON.stringify(this.keywordList));
    },
    //点击搜索出来的歌曲，提交歌曲数据到vuex，vuex再传给底部播放组件，实现歌曲的播放
    playMusci(item){
      this.$store.commit("pushPlayList",item)
      this.$store.commit("upstatePlayListIndex",this.$store.state.playList.length-1)
    }
  },
};
</script>
<style lang='less' scoped>
.search-top {
  width: 100%;
  height: 1.3333rem;
  font-size: 0.48rem;
  padding: 0 0.2667rem;
  display: flex;
  align-items: center;
  // background-color:#d44439;
  input {
    margin-left: 0.2667rem;
    padding: 0.1333rem;
    width: 80%;
    border: none;
    border-bottom: 1px solid #999;
  }
}
.search-history {
  li {
    width: 80%;
    height: 0.64rem;
    font-size: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2667rem 0.4rem;
  }
  .title {
    color: #98999a;
    font-size: 0.4267rem;
  }
}
.searchSongs-box {
  width: 100%;
  background-color: #fff;
  font-size: 18px;
  .songs {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e3e3e3;
    .left {
      display: flex;
      align-items: center;
      margin: 10px;
      font-size: 15px;
      .left-index {
        padding-right: 20px;
        color: #898a8a;
        font-size: 16px;
      }
      #author {
        font-size: 8px;
        color: #898a8a;
      }
    }
    .right {
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 25px;
      .van-icon-video-o {
        padding-right: 8px;
      }
    }
  }
}
</style>