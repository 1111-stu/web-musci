import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant所有组件包
import Vant from 'vant';
import 'vant/lib/index.css'


Vue.use(Vant);

// 导入postcss-pxtorem 配置
import "utils/rem.js"

// 引入图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);



Vue.config.productionTip = false

new Vue({
   //在vue项目中，要想把路由用起来，必须将路由实例对象，像下面一样挂载起来
  //router:路由实例对象
  //同名可缩写
  router,
  store,
  render: h => h(App)
}).$mount('#app')
