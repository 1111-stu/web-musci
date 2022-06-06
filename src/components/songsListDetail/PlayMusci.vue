<template>
  <div>
    <div class="playMusci">
      <div class="left" @click="upstateShowPopup">
        <div class="left-img">
          <img :src="playList[playListIndex].al.picUrl" alt="">
        </div>
        <!-- 歌名 -->
        <div class="left-content">
          <p>{{playList[playListIndex].al.name}}</p>
          <p id="tip">横滑切换上下首</p>
        </div>
      </div>
      <!-- 歌曲列表右侧图标 -->
      <div class="right">
        <van-icon name="play-circle-o" @click="play" v-if="isbtnShow" />
        <van-icon name="pause-circle-o" @click="play" v-else />
        <van-icon name="bars" />
      </div>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    </div>
    <!-- 弹出层，点击底部歌曲播放bar，弹出歌曲详情（胶片播放）页面 -->
    <van-popup v-model="showPopup" position="top" :style="{ height: '100%' }">
      <MusciDetail :musciList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></MusciDetail>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import MusciDetail from "./MusciDetail.vue";
export default {
  components: { MusciDetail },
  data() {
    return {
      interVal: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
    this.autoPlayNext();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.updateTime();
    this.addDuration();
  },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "isbtnShow",
      "showPopup",
      " duration",
      "newCurrentTime"
    ]),
  },
  methods: {
    ...mapMutations([
      "upstateIsbtnShow",
      "upstateShowPopup",
      "updateCurrentTime",
      "upstateDuration",
    ]),
    play() {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.upstateIsbtnShow(false);
        this.updateTime(); //播放调用函数进行传值
      } else {
        this.$refs.audio.pause();
        this.upstateIsbtnShow(true);
        clearInterval(this.interVal); //暂停清除定时器
      }
    },
    addDuration() {
      //获取歌曲的结束时间，提交到vuex应用到MusciDetail页面
      this.upstateDuration(this.$refs.audio.duration);
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime);
        //获取vuex传过来的滑动后的歌曲的时间
      }, 1000);
    },
    //监听当前播放歌曲的时间，如果歌曲结束，自动播放下一首
    autoPlayNext() {
      if (this.$refs.audio.currentTime == this.$refs.audio.duration) {
        let NextIndex = this.playListIndex + 1;
        this.$store.commit("upstatePlayListIndex", NextIndex);
        this.play();
      }
    },
  },
  watch: {
    //监听下标的改变，切换歌曲并且播放
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.upstateIsbtnShow(false);
      }
      // this.$refs.audio.currentTime = this.$store.state.currentTime
      //监听下标的改变，让进度条回归到0位置
       this.$store.commit("updateCurrentTime",this.$refs.audio.currentTime)
    },
    //监听歌单列表数据的改变，自动播放第一首歌曲
    playList() {
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true;
        this.upstateIsbtnShow(false);
      }
    },
    //监听进度条有没有被拖动
    newCurrentTime(){
      this.$refs.audio.currentTime = this.newCurrentTime
    }
  },
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.playMusci {
  width: 100%;
  height: 1.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 2px solid #898a8a;
  position: fixed;
  bottom: 0;
  .left {
    display: flex;
    font-size: 16px;
    .left-img img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    .left-content {
      padding-left: 30px;
      display: flex;
      height: 60px;
      flex-direction: column;
      justify-content: space-around;
      #tip {
        font-size: 10px;
        color: #898a8a;
      }
    }
  }
  .right {
    margin-right: 10px;
    .van-icon-bars {
      padding-left: 15px;
    }
  }
}
</style>