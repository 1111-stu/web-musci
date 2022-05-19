<template>
  <div>
    <div class="nav">
      <router-link to="/recommend">推荐</router-link>
      <router-link to="/rank">排行</router-link>
      <router-link to="/singer">歌手</router-link>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
    return {

    };
  },
  created() {

  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
*{
  margin: 0;
  padding:0;
}
 .nav{
     display: flex;
     justify-content: space-around;
     width: 375px;
     height: 25px;
     text-align: center;
     background-color: #d44439;
     font-size: 16px;
      a {
         margin-top:5px 0;
         color: white;
        }
 }
</style>