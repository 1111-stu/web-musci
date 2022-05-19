<template>
  <div class="listBox">
    <ul>
      <li v-for="(item,index) in initialList" :key="index" class="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Array,
      default:[]
    }
  },
  computed: {
    initialList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    },
  },
};
</script>

<style lang='less' scoped>
</style>