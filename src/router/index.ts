// router.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'
import CadastrarProdutos from '@/views/CadastrarProdutos.vue'
import EditarProduto from '@/views/EditarProduto.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cadastrar',
    name: 'CadastrarProdutos',
    component: CadastrarProdutos
  },
  {
    path: '/editar/:id',
    name: 'EditarProduto',
    component: EditarProduto
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
