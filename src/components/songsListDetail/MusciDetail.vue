<template>
  <div>
    <div class="detailTop">
      <img :src="musciList.al.picUrl" alt="" class="bgImg">
      <div class="detailTopLeft">
        <van-icon name="arrow-left" @click="upstateShowPopup" />
        <div>
          <p>{{musciList.al.name}}</p>
          <span v-for="(item,index) in musciList.ar" :key=index>
            {{item.name}}
          </span>
          <p></p>
        </div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent">
      <img src="@/assets/needle.png" alt="" class="needle">
      <img src="@/assets/roll.png" alt="" class="roll">

      <img :src="musciList.al.picUrl" alt="" class="rollImg">
    </div>
    <div class="detailFoot">
      <div class="foot">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <van-icon name="play-circle-o" @click="play" v-if="isbtnShow" />
        <van-icon name="pause-circle-o" @click="play" v-else />
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    musciList: {
      type: Object,
      required: true,
    },
    play: {
      type: Function,
      required: true,
    },
    isbtnShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  created() {
    console.log(this.musciList);
  },
  methods: {
    ...mapMutations(["upstateShowPopup"]),
  },
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.detailTop {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .detailTopLeft {
    font-size: 18px;
    width: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bgImg {
    height: 100%;
    width: 100%;
    position: absolute;
    filter: blur(70px);
    z-index: -1;
  }
}
.detailContent {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .needle {
    width: 110px;
    height: 150px;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    // 25edg
    transition: all 2s;
  }
  .roll {
    width: 240px;
    height: 240px;
  }
  .rollImg {
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: 6.4rem;
    left: 30%;
    z-index: -1;
  }
}
.detailFoot {
  .foot {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>