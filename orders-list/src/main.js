import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import router from './routes'

import App from './App.vue'


Vue.use(Vuelidate)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
