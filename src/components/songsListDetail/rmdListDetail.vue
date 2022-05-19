<template>
  <Scroll>
    <div>
      <DetailIntroduce :playlist="playlist" v-if="flag1"></DetailIntroduce>
      <ListSongs :listSongs="listSongs" v-if="flag2"></ListSongs>
    </div>
  </Scroll>
</template>
<script>
import Scroll from "base/Scroll.vue";
import DetailIntroduce from "./Detail-introduce.vue";
import ListSongs from "./ListSongs.vue";
import { getListDetailinfo, getListSongs } from "api/songsListDetail";
export default {
  data() {
    return {
      //歌单的详情信息
      playlist: {},
      //歌单的全部歌曲
      listSongs: {},
      //设置个开关，让props可以传动态的数据
      flag1: false,
      flag2: false,
    };
  },
  created() {
    this._getListDetailinfo();
    this._getListSongs();
  },
  methods: {
    async _getListDetailinfo() {
      let id = this.$route.query.id;
      const res = await getListDetailinfo({
        id: id,
      });
      this.flag1 = true;
      this.playlist = res.playlist;
    },
    async _getListSongs() {
      let id = this.$route.query.id;
      const res = await getListSongs({
        id: id,
      });
      this.flag2 = true;
      this.listSongs = res;
    },
  },
  components: {
    DetailIntroduce,
    ListSongs,
    Scroll,
  },
};
</script>

<style lang='less' scoped>
</style>