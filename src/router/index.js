import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Manage.vue'),
    redirect: "/home",
    children: [
      { path: 'home', name: '首页', component: () => import('../views/Home.vue') },
      { path: 'user', name: '用户管理', component: () => import('../views/User.vue') },
      { path: 'file', name: '文件管理', component: () => import('../views/File.vue') },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)
  store.commit("setPath")
  next()
})

export default router
