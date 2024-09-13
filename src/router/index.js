import { createRouter, createWebHistory } from 'vue-router'
// 两个一个路由：一个是登录页，一个是主页（包含二级路由，进入需要重定向到某一子页）
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginpage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/login',
      children: []
    }
  ]
})

export default router
