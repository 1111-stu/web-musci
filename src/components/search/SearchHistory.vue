<template>
  <div>
    <div class="search-history">
      <ul>
        <li class="title">
          <p>搜索历史</p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanchu" @click="removeAll"></use>
          </svg>
        </li>
        <li v-for="(item,index) in keywordList" :key="index" @click="_getSearchResult(item)">
          <p>{{item}}</p>
          <svg class="icon" aria-hidden="true" @click="removeItem(index)">
            <use xlink:href="#icon-shachu-xue"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import {getSearchResult} from "api/search.js"
  export default {
      props:{

      },
  data() {
    return {
        keywordList: [],
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
   mounted() {
    // 每次渲染页面之前,localStorage有值拿到缓存的数据,没值赋值一个空数组
    this.keywordList = JSON.parse(localStorage.getItem("keywordList"))?JSON.parse(localStorage.getItem("keywordList")):[];
  },
  methods: {
    postKey() {
      //输入内容不能为空
      if (this.searchKey != "") {
        //传入关键词，从后台获取数据
        this._getSearchResult(this.searchKey)
        //最新的记录应该添加到数组的最前面
        this.keywordList.unshift(this.searchKey);
        //去重 Set()返回一个对象，...将返回的对象变成参数序列，[]再把参数序列变成数组
        this.keywordList = [...new Set(this.keywordList)];
        if(this.keywordList.length>10){
          this.keywordList.splice(this.keywordList.length-1,1)
        }
        //把数据保存到localStorage里面
        localStorage.setItem("keywordList", JSON.stringify(this.keywordList));
        this.searchKey = "";
        //跳转到搜索结果页
        this.$router.push('/searchResult')
      }
    },
    //输入关键词，从后台获取结果
    async _getSearchResult(keyword){
      const res = await getSearchResult({keywords:keyword})
      console.log(res)
    },
    //删除所有历史记录
    removeAll() {
      this.$dialog
        .confirm({
          title: "全部删除",
          message: "确定要删除全部历史记录吗？",
        })
        .then(() => {
          localStorage.removeItem("keywordList");
          this.keywordList = [];
        })
        .catch(() => {});
    },
    //获取下标，删除指定条历史记录
    removeItem(i) {
      //根据数组下标删除指定历史记录
      this.keywordList.splice(i, 1);
      //删除后localStrorage重新获取keywordList的值
      localStorage.setItem("keywordList", JSON.stringify(this.keywordList));
    },
  },
}
</script>

<style lang='less' scoped>
.search-history {
  li {
    width: 80%;
    height: 0.64rem;
    font-size: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2667rem 0.4rem;
  }
  .title {
    color: #98999a;
    font-size: 0.4267rem;
  }
}
</style>