<template>
  <div>
    <div class="detailTop">
      <img :src="musciList.al.picUrl" alt="" class="bgImg">
      <div class="detailTopLeft">
        <van-icon name="arrow-left" @click="back" />
        <div>
          <p>{{musciList.al.name}}</p>
          <span v-for="(item,index) in musciList.ar" :key=index>
            {{item.name}}
          </span>
        </div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="!isLrcShow" @click="showLrc">
      <img src="@/assets/needle.png" alt="" class="needle" :class="{needleActive:!isbtnShow}">
      <img src="@/assets/roll.png" alt="" class="roll">
      <img :src="musciList.al.picUrl" alt="" class="roll_img" :class="{rollActive:!isbtnShow,rollPaused:isbtnShow}">
    </div>
    <!-- 歌词页面 -->
    <div v-show="isLrcShow" @click="showLrc" class="lrc" ref="lrc">
    <P v-for="(item,index) in splitLyric" :key="index" :class="{active:(currentTime*1000>=item.time && currentTime*1000 < item.pre)}">
      {{item.lrc}}
    </P>
    </div>
    <div class="detailFoot">
      <div class="foot-range">
        <van-slider  v-model="currentTime" @change="onChange" min="0" :max="duration"  bar-height="4px" active-color="#ee0a24"/>
        <!-- <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05"> -->
      </div>
      <div class="foot-icon">
        <svg class="icon" aria-hidden="true" @click="goplay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <van-icon name="play-circle-o" @click="play" v-if="isbtnShow" />
        <van-icon name="pause-circle-o" @click="play" v-else />
        <svg class="icon" aria-hidden="true" @click="goplay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations} from "vuex";
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
    addDuration:{
      type:Function,
      required:true,
    }
  },
  data() {
    return {
      isLrcShow:false //默认显示的是cd页面，点击后显示歌词界面
    };
  },
  mounted(){
    this.addDuration()
  },
  created() {
    // console.log(this.musciList);
    // console.log(typeof(this.Lyric))
    // console.log(this.splitLyric)
  },
  computed:{
    ...mapState(["Lyric","currentTime","playList","playListIndex","duration"]),
    splitLyric:function(){
      let arr;
      if(this.Lyric){
        arr = this.Lyric.split(/[(\r\n)\r\n]+/).map((item)=>{
          let min=item.slice(1,3)
          let sec=item.slice(4,6)
          let mill=item.slice(7,10)
          let lrc=item.slice(11) //11位置以后的全部切割
          let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          //毫秒有些是2位，这个时候只需切割两位，后面从第10位以后全部切割
          if(isNaN(Number(mill))){
            //如果mill不全部是数字，转化为number的时候，变成NaN
             mill=item.slice(7,9)
             lrc=item.slice(10)//10位置以后的全部切割
             time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          }
          //  console.log(min,sec,mill,lrc);
          return{min,sec,mill,lrc,time}
        });
        arr.forEach((item,i) => {
          if(arr.length-1===i || isNaN(arr[i+1].time)){
            item.pre = 100000 //到了歌词的最后一句，直接让其一直突出显示就好
          }else{
            item.pre = arr[i+1].time
          }
        });
      }
      console.log(arr)
      return arr;
    }
  },
  methods: {
    ...mapMutations(["upstateShowPopup","upstatePlayListIndex"]),
    showLrc(){
      this.isLrcShow = !this.isLrcShow
    },
    //返回歌单的时候，要把播放详情切换回磁盘的页面
    back(){
      this.isLrcShow=false 
      this.upstateShowPopup()
    },
    goplay(num){
      let index = this.playListIndex+num
      if(index > this.playList.length-1){
        index = 0
      }else if(index<0){
        index = this.playList.length-1
      }
      this.upstatePlayListIndex(index)
    },
     // 拖拽音乐进度
    onChange(e) {
      //把currentTime传到vuex，再更改audio标签的currentTime
      let newCurrentTime = Math.round(e / 100 * this.$store.state.duration);
      this.$store.commit("upstateNewCurrentTime",newCurrentTime)
    },
  },
  watch:{
    currentTime(newValue){
       let p = document.querySelector("p.active")
      //  为防止报错，拿到p之后再操作
      if(p){
         if(p.offsetTop>300){
         this.$refs.lrc.scrollTop=p.offsetTop-300
       }
      }
      if(newValue===this.duration){
        //如果是最后一首,自动播放第一首
        if(this.playListIndex===this.playList.length-1){
          this.upstatePlayListIndex(0);
          this.play()
        }else{
           this.upstatePlayListIndex(this.playListIndex+1);
        }
      }
    },
    //监听下标的改变，让进度条回归到0位置
    //  playListIndex() {
    //     this.$store.commit("updateCurrentTime",0)
    //   } 
  }
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
    transition: all 2s;
  }
  .needleActive {
    width: 110px;
    height: 150px;
    transform-origin: 0 0;
    transform: rotate(25deg);
    transition: all 2s;
  }
  //通过添加类，来实现胶片内图片动画的暂停和运行
  .rollActive{
    animation-play-state: running;
  }
  .rollPaused{
    animation-play-state: paused;
  }
  //让胶片内的图片旋转
  @keyframes rotate_img{
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform:rotateZ(360deg);
    }
  }
  .roll {
    width: 240px;
    height: 240px;
  }
  .roll_img {
    width: 4rem;
    height: 4rem;
    position: absolute;
    top: 6.4rem;
    left: 30%;
    z-index: -1;
    animation: rotate_img 10s linear infinite;
  }
}
.detailFoot {
  .range{
    width: 100%;
    height: .08rem;
  }
  .foot-icon{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
// 设置歌词的样式
.lrc{
  width: 100%;
  height:12rem;
  font-size:.3733rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow:scroll;
  margin-top: .5333rem;
  p{
    color:#fff;
    margin-bottom: .2667rem;
  }
  .active{
    font-size:.6667rem;
    color: #000;
  }
}
</style>