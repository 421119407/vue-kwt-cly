// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Store from './store'
import axios from './axios'
import 'font-awesome.css/css/font-awesome.css'
import api from './api'
import './style/index.scss' //global css

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$ajax = axios
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: { App },
  template: '<App/>'
})
