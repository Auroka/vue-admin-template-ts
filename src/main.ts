/*
 * @Description:
 * @Author: lxd
 * @Date: 2020-09-16 16:56:27
 * @LastEditTime: 2020-09-17 17:25:52
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import './permission'

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
