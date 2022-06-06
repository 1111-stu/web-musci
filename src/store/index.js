import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { getMusciLyric } from 'api/musciDetail'
export default new Vuex.Store({
  state: {
    //播放列表
    playList: [
      {  
        al: {
          id: 140459488,
          name: "蝴蝶泉边（吉他版）",
          pic: 109951167086402340,
          picUrl: "https://p2.music.126.net/7BaLyY4q3FmFGDqtN6bA-g==/109951167086402329.jpg"
        },
        name: "蝴蝶泉边（吉他版）",
        id: 1920784999
      }
    ],
    playListIndex: 0,//默认下标为零
    isbtnShow: true,//暂停按钮的显示
    showPopup: false,//歌曲详情页的显示
    Lyric:{},//歌词
    currentTime:0,//歌曲播放当前时间
    duration:0,//歌曲的总时长
    isLogin:false,//判断是否登录
    isFootMusci:true,//判断是否显示底部播放组件
    newCurrentTime:0//拖动进度条后的时间
  },
  mutations: {
    upstateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    pushPlayList(state,value){
      state.playList.push(value)
      console.log(value)
      console.log(state.playList)
    },
    updatePlayList(state, value) {
      state.playList = value
      console.log(state.playList)
    },
    upstatePlayListIndex(state, value) {
      state.playListIndex = value
      console.log(state.playListIndex)
    },
    upstateShowPopup(state) {
      state.showPopup = !state.showPopup
    },
    upstateLyric(state,value) {
      state.Lyric = value
    },
    updateCurrentTime(state,value){
      state.currentTime = value
      // console.log(state.currentTime)
    },
    upstateDuration(state,value){
      state.duration = value
    },
    upstateNewCurrentTime(state,value){
      state.newCurrentTime = value
      state.currentTime = value
    }
  },
  actions: {
    async getLyric(context,value){
      const res = await getMusciLyric(value)
      console.log(res)
      context.commit("upstateLyric",res.lrc.lyric) //利用context.commit将更改后的数据提交出去
    }
  },
  modules: {

  }
})
