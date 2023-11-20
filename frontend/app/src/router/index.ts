import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CadastrarProdutos from '../components/CadastrarProdutos.vue';
import EditarProdutos from '../components/EditarProduto.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: CadastrarProdutos,
  },
  {
    path: '/editar/:id',  
    name: 'editar',
    component: EditarProdutos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
