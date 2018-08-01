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
  Uploader,
  RadioGroup,
  Radio,
  Cell,
  Popup
} from 'vant';

Vue.use(Button)
  .use(Field)
  .use(CellGroup)
  .use(NavBar)
  .use(Icon)
  .use(Uploader)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)
  .use(Popup)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
