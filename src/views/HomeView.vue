<template>
  <div class="product-list">
    <h1>Lista de Produtos</h1>
    <hr>

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
</template>

<style scoped>
.product-list {
  max-width: 800px;
  margin: 0 auto;
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

.product-image {
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
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

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import http from '@/services/http';

export default defineComponent({
  name: 'Tabela',
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
        alert('Algo deu errado, tente novamente mais tarde.');
      }
    },
    async deletarProduto(id: number) {
      const confirmarExclusao = confirm('Tem certeza que deseja excluir este produto?');
      if (confirmarExclusao) {
        try {
          await http.delete(`http://127.0.0.1:8000/api/products/${id}`);
          alert('Produto excluído com sucesso!');
          this.loadAllProducts();
        } catch (error) {
          console.error('Erro ao excluir o produto:', error);
          alert('Algo deu errado ao excluir o produto.');
        }
      }
    },
  },
  mounted() {
    this.loadAllProducts();
  },
});
</script>
