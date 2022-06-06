import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入所需要的组件
import Home from "../views/Home.vue"
import Register from "../components/Register.vue"
import Login from "../components/Login.vue"
// import Recommend from "../components/index/Recommend.vue"
// import Rank from "../components/index/rank/Rank.vue"
const router = new VueRouter({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/recommend',
      component:()=>import('components/index/Recommend.vue')
    },
    {
      path:'/rank',
      component:()=>import('components/index/rank/Rank.vue')
    },
    {
      path:'/singer',
      component:()=>import('components/index/Singer.vue')
    },
    {
      path:'/rmdListDetail',
      component:()=>import('components/songsListDetail/rmdListDetail.vue')
    },
    {
      path:'/search',
      component:()=>import('components/search/Search.vue')
    },
    {
      path:'/searchResult',
      component:()=>import('components/search/SearchResult.vue')
    },
    {
      path:`/toplistSongs`,
      component:()=>import('components/index/rank/ToplistSongs.vue')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   // if(to.path=='/login'){
//   //   store.state.
//   // }
// })
export default router