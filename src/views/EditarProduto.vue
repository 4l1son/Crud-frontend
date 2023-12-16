<template>
  <div class="container mt-1">
    <router-link :to="'/'"></router-link>
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Editar Produto</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="editProduct">
          <div class="mb-3">
            <label for="id" class="form-label">Código de Identificação</label>
            <input type="text" class="form-control" v-model="id" id="id" readonly>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" v-model="name" id="name">
          </div>
          <div class="mb-3">
            <label for="LinkImagem" class="form-label">Link da Imagem</label>
            <input type="text" class="form-control" v-model="LinkImagem" id="LinkImagem">
          </div>
          <div class="mb-3">
            <label for="Preco" class="form-label">Preço</label>
            <input type="text" class="form-control" v-model="Preco" id="Preco">
          </div>
          <div class="mb-3">
            <label for="CEP" class="form-label">CEP</label>
            <input type="text" class="form-control" v-model="CEP" id="CEP">
          </div>
          <button type="submit" class="btn btn-primary">Atualizar</button>
        </form>
      </div>
    </div>
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
        }
      } catch (error) {
        console.error('Erro ao editar o produto:', error);
        alert('Algo deu errado ao editar o produto.');
      }
    },
  },
  setup() {
    const router = useRouter();
    const id = ref('');
    const name = ref('');
    const LinkImagem = ref('');
    const Preco = ref('');
    const CEP = ref('');

    onMounted(async () => {
      const routeId = router.currentRoute.value.params.id;

      if (routeId) {
        id.value = Array.isArray(routeId) ? routeId[0] : routeId;

        // Carregar dados do produto
        try {
          const response = await http.get(`http://127.0.0.1:8000/api/products/${id.value}`);
          const product = response.data;

          // Preencher os campos com os dados do produto
          name.value = product.name;
          LinkImagem.value = product.LinkImagem;
          Preco.value = product.Preco;
          CEP.value = product.CEP;
        } catch (error) {
          console.error('Erro ao carregar os dados do produto:', error);
        }
      }
    });

    return {
      id,
      name,
      LinkImagem,
      Preco,
      CEP,
    };
  },
});
</script>
<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.back-link {
  display: block;
  margin-bottom: 10px;
  color: #3490dc;
  text-decoration: none;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
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

.form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-primary {
  background-color: #3490dc;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border-color: #bee5eb;
}
</style>