import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'

Vue.use(BootstrapVue)

Vue.use(VueAnalytics, {
  id: 'UA-126957541-1',
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  },
  router
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
