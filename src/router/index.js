//creteRouter:创建router实例
// createWebHistory:创建history模式的路由实例
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component的对应关系的位置
  routes: [
    //一级路由
    {
      path: '/',
      component: Layout,
      //二级路由
      children: [
        {
          path: '',//默认子路由,置空
          component: Home
        },
        {
          path:'/category',
          component:Category
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }

  ]
})

export default router
