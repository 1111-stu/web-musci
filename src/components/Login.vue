<template>
  <div>
    这里是登录页
    <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    <van-field v-model="password" label="密码" placeholder="请输入密码" />
    <van-button size="large" type="danger" @click="_login" center>登录</van-button>
  </div>
</template>
<script>
import {login} from "api/login.js"
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  created() {
  },
  methods: {
    async _login() {
      const res = await login({
        phone:this.phone,
        password:this.password,
      })
      console.log(res)
      this.$router.push('/recommend')
    },
  },
};
</script>

<style  scoped>

</style>