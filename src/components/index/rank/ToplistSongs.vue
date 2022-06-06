<template>
  <div>
    <DetailIntroduce  :playlist="playlist" v-if="flag1">
         <span>排行榜</span>
     </DetailIntroduce>
     <ListSongs :listSongs="listSongs" v-if="flag2"></ListSongs>
  </div>
</template>
<script>
import { getListSongs, getListDetailinfo } from "api/songsListDetail";
import DetailIntroduce from "components/songsListDetail/Detail-introduce.vue";
import ListSongs from "components/songsListDetail/ListSongs.vue";
import { mapMutations } from 'vuex'
export default {
  created() {
    this._getListSongs();
    this._getListDetailinfo();
    this.updatePlayList(this.listSongs.songs)
  },
  data() {
    return {
      listSongs:{},
      playlist:{},
      //设置个开关，让props可以传动态的数据
      flag1: false,
      flag2: false,
    };
  },
  methods: {
    //传入id获取榜单详情介绍
    async _getListDetailinfo() {
      let id = this.$route.query.id;
      const res = await getListDetailinfo({
        id: id,
      });
      this.flag1 = true;
      this.playlist = res.playlist;
    },
    // 传入id获取榜单全部歌曲
    async _getListSongs() {
      let id = this.$route.query.id;
      const res = await getListSongs({
        id: id,
      });
      this.flag2 = true;
      this.listSongs = res;
    },
    //解构更新播放列表的vuex函数
     ...mapMutations(["updatePlayList"])
  },
  computed:{
  },
  components: {
    ListSongs,
    DetailIntroduce,
  },
};
</script>

<style lang='less' scoped>
</style>