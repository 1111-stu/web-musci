<template>
  <div>
     <Header></Header>
     <Nav></Nav>· ··
  </div>
</template>

<script>
  import Header from "../common/Header.vue"
  import Nav from "../common/Nav.vue"
  export default {
  data() {
    return {

    };
  },
  created() {
    // this.getSingerRank()
    // this.getListDetail()
  },
  methods: {
      async getSingerRank(){
        const { data: res }  = await this.$http.get(`/toplist/detail`)
        if(res.code !== 200){
          return this.$toast.fail('获取歌手排行榜失败');
        }
        console.log(res)
      },
      async getListDetail(){
        const{data:res} = await this.$http.get(`/playlist/track/all?id=3779629&limit=10&offset=0`)
        if(res.code !== 200){
          return this.$toast.fail('获取歌单详情失败');
        }
        console.log(res)
      }
  },
  components: {
      Header,
      Nav
  }
}
</script>

<style lang='less' scoped>
</style>