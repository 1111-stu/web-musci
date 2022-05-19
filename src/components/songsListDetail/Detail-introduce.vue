<template>
  <div class="content-box">
    <img :src="playlist.coverImgUrl" alt="">
    <div class="back">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>歌单</span>
    </div>
    <div class="descript-box">
      <div class="description">
        <span>{{playlist.description}}</span>
      </div>
      <div class="playcount">
        <van-icon name="service" />
        <span>{{playlist.playCount}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { changePlaycount } from "@/common/js/dataProcess.js";
export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    this.processData();
  },
  methods: {
    processData() {
      //处理歌单的播放数据
      this.playlist.playCount = changePlaycount(this.playlist.playCount);
    },
  },
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.content-box {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
img {
  position: absolute;
  width: 100%;
  height: 300px;
  z-index: -2;
}
.back {
  font-size: 16px;
  color: #fff;
  margin-left: 15px;
  padding-top: 10px;
  span {
    padding-left: 10px;
  }
}
.descript-box{
    margin-bottom:15px;
}
.description {
  font-size: 14px;
  font-weight: 600;
  margin-left: 16px;
  color:#fff;
  padding-bottom:5px;
}
.playcount {
  margin-left: 16px;
  font-size: 10px;
  color: #fff;
}
</style>