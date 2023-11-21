<script lang="ts">
import { defineComponent } from 'vue';
import http from '@/services/http';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Tabela',
  data() {
    return {
      produtos: [] as Array<any>
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

<template>
  <div>
    <p>Lista de produtos</p>
   <button><router-link to="/cadastrar">Cadastrar Produtos</router-link></button>
    <hr>
    <table>
      <thead>
        <tr>
          <th>Codigo de identificação</th>
          <th>Nome do produto</th>
          <th>Link da imagem</th>
          <th>Preço</th>
          <th>CEP</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(produto, index) in produtos" :key="index">
          <td>{{ produto.id }}</td>
          <td>{{ produto.name }}</td>
          <td>{{ produto.LinkImagem }}</td>
          <td>{{ produto.Preco }}</td>
          <td>{{ produto.CEP }}</td>

          <td>
            <router-link :to="'/editar/' + produto.id">
             <button class="btn btn-link">    
              <i class="fas fa-pencil-alt" aria-hidden="true"></i>
            </button>
              </router-link>
              <button class="btn btn-link"
                @click="deletarProduto(produto.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
