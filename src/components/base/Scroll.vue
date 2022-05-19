<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: null,
    },
  },
  // 组件创建完后调用。
  mounted() {
    //   确保dom结点渲染完成后调用
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return; //确保渲染出dom节点才初始化
      }
      //初始化better-scroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
      });
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollToElement(){
      this.scroll && this.scroll.scrollToElement();
    },
    scrollTo(){
      this.scroll && this.scroll.scrollTo();
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  },
};
</script>

<style scoped>
</style>
