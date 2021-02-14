import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//添加事件总线
Vue.prototype.$bus= new Vue()

//使用懒加载插件
Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
