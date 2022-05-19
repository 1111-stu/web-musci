import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
        ar:[{ name: "Bell玲惠" }],
        id: 1920784999
      }
    ],
    playListIndex: 0,//默认下标为零
    isbtnShow: true,//暂停按钮的显示
    showPopup: false,//歌曲详情页的显示
  },
  mutations: {
    upstateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    updatePlayList(state, value) {
      state.playList = value
      console.log(state.playList)
    },
    upstatePlayListIndex(state, value) {
      state.playListIndex = value
      console.log(state.playListIndex)
    },
    upstateShowPopup(state, value) {
      state.showPopup = !state.showPopup
    }
  },
  actions: {
  },
  modules: {
  }
})
