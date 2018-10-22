import Vue from 'vue'
import Router from 'vue-router'
import NaiveSticky from './components/naive/NaiveSticky.vue'
import VirtualNaive from './components/virtual/naive/VirtualNaive.vue'
import VirtualReuse from './components/virtual/reuse/VirtualReuse.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/naive',
      name: 'naive',
      component: NaiveSticky
    },
    {
      path: '/virtual-naive',
      name: 'virtual-naive',
      component: VirtualNaive
    },
    {
      path: '/virtual-reuse',
      name: 'virtual-reuse',
      component: VirtualReuse
    },
  ]
})
