<template>
    <div class="songs-box">
      <div class="play-all">
        <van-icon name="play-circle-o" />
        <span id="play">播放全部<span id="songscount">(共{{listSongs.songs.length}}首)</span></span>
      </div>
      <div class="songs" v-for="(song,index) in listSongs.songs" :key="index">
        <div class="left" @click="postSongsTovuex(index)" >
          <div class="left-index">
            <span>{{index+1}}</span>
          </div>
          <!-- 歌名和作者 -->
          <div class="left-content">
            <p>{{song.name}}</p>
            <span v-for="(author,arIndex) in song.ar" :key="arIndex" id="author" >{{author.name}}</span>
          </div>
        </div>
        <!-- 歌曲列表右侧图标 -->
        <div class="right">
          <van-icon name="video-o" v-if="song.mv!=0"/>
          <van-icon name="wap-nav" />
        </div>
      </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  props: {
    listSongs: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log("------")
    console.log(this.listSongs)
  },
  methods:{
    ...mapMutations(["updatePlayList", "upstatePlayListIndex"]),
    // 给vuex传歌单的全部歌曲，vuex再给播放组件传值
    postSongsTovuex(index){
      this.updatePlayList(this.listSongs.songs)
      this.upstatePlayListIndex(index)
    },
  },
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.songs-box {
  width: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  position: absolute;
  top: 285px;
  font-size: 18px;
  .play-all {
    width: 100%;
    margin: 10px;
    padding-bottom:10px;
    border-bottom:2px solid  #898a8a;
    #play {
      padding-left: 10px;
    }
    #songscount {
      line-height: 25px;
      vertical-align: center;
      color: #898a8a;
      font-size: 10px;
    }
  }
  .songs{
    display: flex;
    justify-content:space-between;
    border-bottom:2px solid #e3e3e3;
    .left{
      display: flex;
      align-items: center;
      margin: 10px;
      font-size: 15px;
      .left-index{
         padding-right:20px ;
         color: #898a8a;
         font-size: 16px;
         }
        #author{
           font-size: 8px;
           color: #898a8a;
      }
    }
    .right{
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 25px;
      .van-icon-video-o{
        padding-right:8px;
      } 
    }
  }
}
</style>