<template>
  <div class="container mt-1">
    <router-link to="/cadastrar"></router-link>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Lista de Produtos</h3>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Produto</th>
              <th>Imagem</th>
              <th>Preço</th>
              <th>CEP</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td>{{ produto.id }}</td>
              <td>{{ produto.name }}</td>
              <td>{{ produto.LinkImagem }}</td>
              <td>{{ produto.Preco }}</td>
              <td>{{ produto.CEP }}</td>
              <td>
                <router-link :to="'/editar/' + produto.id" class="action-link">
                  <i class="fas fa-pencil-alt" aria-hidden="true"></i> Editar
                </router-link>
                <button @click="deletarProduto(produto.id)" class="action-button">
                  <i class="fa fa-trash" aria-hidden="true"></i> Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import http from '@/services/http';
import { defineAsyncComponent } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
  name: 'ListaProdutos',
  components: {
    VueSweetalert2: defineAsyncComponent(() => import('vue-sweetalert2')),
  },
  data() {
    return {
      produtos: [] as Array<any>,
    };
  },
  methods: {
    async loadAllProducts() {
      try {
        const response = await http.get('http://127.0.0.1:8000/api/products');
        this.produtos = response.data;
      } catch (error) {
        console.error('Erro ao carregar os produtos:', error);
        (this as any).$swal({
          title: 'Erro!',
          text: 'Algo deu errado ao carregar os produtos. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },

    async deletarProduto(id: number) {
      (this as any).$swal({
        title: 'Confirmação',
        text: 'Tem certeza que deseja excluir este produto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
      }).then(async (result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          try {
            await http.delete(`http://127.0.0.1:8000/api/products/${id}`);
            (this as any).$swal({
              title: 'Sucesso!',
              text: 'Produto excluído com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.loadAllProducts();
          } catch (error) {
            console.error('Erro ao excluir o produto:', error);
            (this as any).$swal({
              title: 'Erro!',
              text: 'Algo deu errado ao excluir o produto.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        }
      });
    },
  },
  mounted() {
    this.loadAllProducts();
  },
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

.card-header {
  background-color: #3490dc;
  color: #fff;
  padding: 12px;
}

.card-title {
  margin: 0;
}

.card-body {
  padding: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.action-link, .action-button {
  color: #3490dc;
  cursor: pointer;
  margin-right: 10px;
}

.action-button {
  background: none;
  border: none;
}
</style>
