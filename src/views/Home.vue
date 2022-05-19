<template>
  <div>
    <h1>首页</h1>
  <van-button round type="info" size="large" @click="toLogin()">登录</van-button>
  <van-button round type="info" size="large" @click="toRegister()">注册</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    toLogin(){
      this.$router.push(`/Login`);
      this.$toast("正跳转到登录页");
    },
    //点击注册按钮跳转到注册页面
    toRegister() {
      this.$router.push(`/register`);
      this.$toast("正跳转到注册页");
    },
  },
};
</script>

<style scoped>

</style>