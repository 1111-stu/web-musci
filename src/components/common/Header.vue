<template>
  <div>
    <!-- <van-row type="flex" justify="space-between">
    <van-col span="8"> <van-icon name="wap-nav" /></van-col>
    <van-col span="8"> <span>VMUSICJIN</span></van-col>
    <van-col span="8"> <van-icon name="search"/></van-col>
    </van-row> -->
    <div class="header">
      <van-icon name="wap-nav" />
      <span>VMUSICJIN</span>
      <van-icon name="search" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang ="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.header{
  width: 375px;
  height: 25px;
  background-color: #d44439;
  display:flex;
  justify-content: space-between;
  color: white;
   font-size:18px;
  .van-icon,span{
    margin:4px 4px;
  }
}
</style>