<template>
  <Scroll class="listview" :data=data>
    <div class="listbox">
      <ul>
        <li v-for="(group,index) in data" :key="index" class="list-group">
          <h2 class="group-item-title">{{group.title}}</h2>
          <ul>
            <li v-for="(item,index) in group.items" :key="index" class="list-item">
              <img v-lazy="item.avatar" class="avatar" />
              <span class="name">{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      //右侧首字母快速入口
      <div class="list-shortcut" @touchmove.stop.prevent="onShortcutTouchMove">
        <ul>
          <li v-for="(item, index) in shortcutList" :key="index" @touchstart="onShortcutTouchStart($event, index)" class="item">{{item}}</li>
        </ul>
      </div>
    </div>
  </Scroll>
</template>
<script>
import Scroll from "base/Scroll";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    },
  },
  components: {
    Scroll,
  },
  methods: {
    onShortcutTouchStart(e, index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
    },
  },
  scrollTo() {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
  },
  scrollToElement() {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  },
};
</script>

<style lang='less' scoped>
* {
  margin: 0;
  padding: 0;
}
.list-item {
  display: flex;
  height: 60px;
}
.group-item-title {
  font-size: 14px;
  line-height: 18px;
  background-color: #dadbdc;
  color: black;
  padding-left: 5px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 4px;
}
.name {
  font-size: 14px;
  color: black;
  margin-left: 20px;
  line-height: 54px;
  vertical-align: center;
}
.list-shortcut {
  position: fixed;
  z-index: 30;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: #fff;
  .item {
    padding: 3px;
    line-height: 1;
    color: #000;
    font-size: 12px;
    //  &表示当前元素
    &.current {
      color: blue;
    }
  }
}
</style>