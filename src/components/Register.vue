<template>
  <div>
    <h1>注册页</h1>
    <!-- 输入注册信息 -->
    <van-cell-group>
      <van-field v-model="phone" required label="手机号" placeholder="请输入手机号" error-message="手机号格式错误" />
      <van-field v-model="password" required label="密码" placeholder="请输入密码" error-message="密码不能为空"/>
      <van-field v-model="nickname" required label="昵称" placeholder="请输入昵称" error-message="昵称不能为空"/>

    </van-cell-group>
    <!--发送以及输入验证码，调起数字键盘 -->
    <van-field v-model="captcha" center clearable label="短信验证码" placeholder="请输入短信验证码">
      <template #button>
        <van-button size="small" type="primary" @click="_getCaptcha">获取验证码</van-button>
      </template>
    </van-field>
    <van-button size="large" type="danger" @click="_register" center>注册</van-button>
  </div>
</template>

<script>
import {sentCaptcha,getCaptcha,checkCaptcha,register} from 'api/register.js'
export default {
  data() {
    return {
      phone: "",
      captcha: "",
      password: "",
      nickname: "",
    };
  },
  created() { 
  },
  methods: {
    //向手机发送验证码
    async _sentCaptcha() {
      const res = await sentCaptcha({
        phone:this.phone
      })
      if (res.code !== 200) {
       return this.$toast('发送验证码失败');
      }
      this.$toast("验证码发送成功，请注意查收");
    },
    //点击获取验证码按钮，向输入的手机号，发送验证码,需要注意的是，发送验证码之前,要校验手机号是否已经注册过
    async _getCaptcha() {
      const res = await getCaptcha({
        phone:this.phone
      })
      if(res.exist === 1 ){
        this.$toast('此手机号已注册过，请直接登录');
        this.$router.push(`/login`)
      }
      else{
        this._sentCaptcha();
        this.$toast('验证码发送成功，请开始注册');
      }
      console.log("-----------------")
      console.log(res)
    },
    //校验验证码是否正确
    async _checkCaptcha() {
      const res = await checkCaptcha({
        phone:this.phone,
        captcha:this.captcha
      })
      if(res.code !== 200){
        return this.$toast('验证码错误，请重新输入');
      }
      this.$toast("验证码校验成功");
    },
    //注册网易云账号
    async _register() {
      this._checkCaptcha();//先校验验证码是否正确
      const res = await register({
        phone:this.phone,
        password:this.password,
        captcha:this.captcha,
        nickname:this.nickname
      })
      if(res.code !== 200){
        return this.$toast('注册网易云账号失败');
      }
    },
  },
};
</script>
<style  scoped>

</style>