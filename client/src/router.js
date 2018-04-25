import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Detail from './views/DetailQuestion.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/question/:id',
      name: 'detail',
      meta: { auth: true },
      component: Detail
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      alert('maaf anda tidak memiliki akses, mohon login terlebih dahulu')
      next({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
