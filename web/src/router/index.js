import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import News from '@/views/News.vue'
import New from '@/views/New.vue'
import Product from '@/views/Product.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/news/:id',
    name: 'new',
    component: New
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
