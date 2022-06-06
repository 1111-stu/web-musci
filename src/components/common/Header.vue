<template>
  <div>
    <div class="header">
     <van-icon name="wap-nav"/>
      <span>VMUSICJIN</span>
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')" >
        <use xlink:href="#icon-sousuo"></use>
      </svg>
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
.header {
  width: 375px;
  height: 25px;
  background-color: #d44439;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 18px;
  .van-icon{
    margin: .1067rem;
    padding: 0 .2667rem;
  }
  .icon{
    margin: .1067rem;
    padding: 0 .2667rem;
  }
  }
</style>