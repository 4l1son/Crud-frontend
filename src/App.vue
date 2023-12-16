<template>
  <div>
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/cadastrar" class="nav-link">Cadastrar</router-link>
      <!-- Adicione mais links conforme necessário -->
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
  background-color: #f8f9fa; /* Cor de fundo do menu */
}

/* Ajustes de estilo para os links */
nav a {
  font-weight: bold;
  color: #2527a5;
  margin-right: 15px;
  text-decoration: none;
  padding: 5px 10px; /* Espaçamento interno nos links */
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

/* Cor quando hover */
nav a:hover {
  background-color: #e0e0e0; /* Cor de fundo ao passar o mouse */
}

/* Cor quando ativo */
nav a.router-link-exact-active {
  background-color: #0c82a7;
  color: #fff; /* Cor do texto ao ativar */
}
</style>
