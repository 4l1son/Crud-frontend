<template>
  <div>
    <router-link :to="'/'  ">
    <button>Voltar para home</button>
    </router-link>
    <hr>
    <p class="h3">Editar produtos</p>
    <hr class="my-4">
    <form @submit.prevent="editProduct">
      <div class="mb-3">
        <label for="id" class="form-label">Id</label>
        <input type="text" class="form-control form-control-sm" v-model="id" id="id">
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control form-control-sm" v-model="name" id="name">
      </div>
      <div class="mb-3">
        <label for="LinkImagem" class="form-label">Link da Imagem</label>
        <input type="text" class="form-control form-control-sm" v-model="LinkImagem" id="LinkImagem">
      </div>
      <div class="mb-3">
        <label for="Preco" class="form-label">Preço</label>
        <input type="text" class="form-control form-control-sm" v-model="Preco" id="Preco">
      </div>
      <div class="mb-3">
        <label for="CEP" class="form-label">CEP</label>
        <input type="text" class="form-control form-control-sm" v-model="CEP" id="CEP">
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import http from '@/services/http';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'EditarProduto',
  data() {
    return {
      id: '',
      name: '',
      LinkImagem: '',
      Preco: '',
      CEP: '',
    };
  },
  methods: {
    async editProduct() {
      const productUpdate = {
        id: this.id,
        name: this.name,
        LinkImagem: this.LinkImagem,
        Preco: this.Preco,
        CEP: this.CEP,
      };

      try {
        if (this.id) {
  await http.put(`http://127.0.0.1:8000/api/products/${this.id}`, productUpdate);
  alert('Produto editado com sucesso!');
} else {
  console.error('ID do produto não está definido.');
}
        alert('Produto editado com sucesso!');
      } catch (error) {
        console.error('Erro ao editar o produto:', error);
        alert('Algo deu errado ao editar o produto.');
      }
    },
  },
  setup() {
    const router = useRouter();
    const id = ref('');

    onMounted(() => {
      // Recupera o ID da rota
      const routeId = router.currentRoute.value.params.id;
      if (routeId) {
        // Garante que routeId seja tratado como uma string
        id.value = Array.isArray(routeId) ? routeId[0] : routeId;
        // Restante do código...
      }
    });

    return {
      id,
    };
  },
});
</script>

<style>
/* styles.css */

body {
display: flex;
justify-content: center;
align-items: center;
min-height: 100vh;
margin: 0;
background-color: #f8f9fa; /* Cor de fundo opcional */
}

.container {
max-width: 400px;
width: 100%;
padding: 20px;
background-color: #fff;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
