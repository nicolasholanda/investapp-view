import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import router from './router.js'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(VueMaterial)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(value).format('DD/MM/YYYY hh:mm')
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
