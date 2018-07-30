import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


import {
  Button,
  Field,
  CellGroup,
  NavBar,
  Icon,
  Uploader
} from 'vant';

Vue.use(Button)
  .use(Field)
  .use(CellGroup)
  .use(NavBar)
  .use(Icon)
  .use(Uploader)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
