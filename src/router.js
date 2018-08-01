import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import Identity from './views/Identity.vue'
import Audittruck from './views/AuditTruck.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/identity',
      name: 'identity',
      component: Identity
    },
    {
      path: '/audittruck',
      name: 'audittruck',
      component: Audittruck
    }
  ]
})
