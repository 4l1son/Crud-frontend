<template>

<div class="container mt-1">
    <router-link :to="'/'">
    </router-link>
    <div class="card">
        <div class="card-header" >
        <h3 class="card-title">Cadastrar Produtos</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="cadProduct">
          <div class="mb-2">
            <label for="id" class="form-label">Código de Identificação</label>
            <input type="text" class="form-control" v-model="id" id="id">
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
            <input type="text" class="form-control" v-model="CEP" id="CEP" @input="getapiViacep">
          </div>
          <transition name="fade">
            <p v-if="cepShowData" class="mt-3 alert alert-info">{{ cepShowData }}</p>
          </transition>
          <button type="submit" class="btn btn-primary mt-3">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>

</template>

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
<script lang="ts">
import { defineComponent } from 'vue';
import http from '@/services/http';
import { useRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

export default defineComponent({
  name: 'CadastrarProdutos',
  components: {
    VueSweetalert2: defineAsyncComponent(() => import('vue-sweetalert2')),
  },
  data() {
    return {
      id: '',
      name: '',
      LinkImagem: '',
      Preco: '',
      CEP: '',
      cepShowData: '',
    };
  },
  methods: {
    async cadProduct() {
      const productCreate = {
        id: this.id,
        name: this.name,
        LinkImagem: this.LinkImagem,
        Preco: this.Preco,
        CEP: this.CEP,
      };

      try {
        await http.post('http://127.0.0.1:8000/api/products', productCreate);
        (this as any).$swal({
          title: 'Sucesso!',
          text: 'Produto salvo com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        (this as any).$swal({
          title: 'Erro!',
          text: 'Algo deu errado. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
    getapiViacep() {
      if (this.CEP.length === 8) {
        http.get(`https://viacep.com.br/ws/${this.CEP}/json/`)
          .then((response: any) => {
            this.cepShowData = `Cidade: ${response.data.localidade}, Estado: ${response.data.uf}, Bairro ${response.data.bairro} `;
          })
          .catch(() => {
            this.cepShowData = 'Erro ao obter dados do CEP.';
          });
      }
    },
  },
});
</script>
