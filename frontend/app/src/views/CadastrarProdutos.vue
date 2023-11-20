<template>
    <div>
        <router-link :to="'/'  ">
    <button>Voltar para home</button>
    </router-link>
        <hr>
      <p class="h3">Cadastrar produtos</p>
      <hr class="my-4">
      <form @submit.prevent="cadProduct">
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
  import { defineComponent } from 'vue';
  import http from '@/services/http';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'CadastrarProdutos',
    data() {
      return {
        id: "",
        name: "",
        LinkImagem: "",
        Preco: "",
        CEP: "",
      };
    },
    methods: {
      cadProduct() {
        const productCreate = {
          id: this.id,
          name: this.name,
          LinkImagem: this.LinkImagem,
          Preco: this.Preco,
          CEP: this.CEP,
        };
  
        http
          .post("http://127.0.0.1:8000/api/products", productCreate)
          .then(() => {
            alert("Produto salvo com sucesso!!!");
          })
          .catch(() => {
            alert("Algo deu errado. Tente novamente mais tarde.");
          });
      },
    },
  });
  </script>
  <style></style>