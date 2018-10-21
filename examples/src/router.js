import Vue from 'vue'
import Router from 'vue-router'
import NaiveSticky from './components/naive/NaiveSticky.vue'
import VirtualReuse from './components/virtual/VirtualReuse.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/naive',
      name: 'naive',
      component: NaiveSticky
    },
    {
      path: '/virtual-reuse',
      name: 'virtual-reuse',
      component: VirtualReuse
    },
  ]
})
