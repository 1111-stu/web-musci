import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入所需要的组件
import Home from "../views/Home.vue"
import Register from "../components/Register.vue"
import Login from "../components/Login.vue"
import Recommend from "../components/index/Recommend.vue"
import Rank from "../components/index/Rank.vue"
import Singer from "../components/index/Singer.vue"
const router = new VueRouter({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        
      ]
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
      component: Recommend
    },
    {
      path:'/rank',
      component: Rank
    },
    {
      path:'/singer',
      component:Singer
    },
    {
      path:'/rmdListDetail',
      component:()=>import('components/songsListDetail/rmdListDetail.vue')
    }
  ]
})
export default router