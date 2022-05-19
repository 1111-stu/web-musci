<template>
  <div id="app">
    <router-view></router-view>
    <PlayMusci></PlayMusci>
  </div>
</template>
<script>
import PlayMusci from "components/songsListDetail/PlayMusci.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    PlayMusci,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>