<template>
  <div>
    <nav>
      <router-link to="/" class="nav-link"><i class="fas fa-home"></i>Home</router-link>
      <router-link to="/cadastrar" class="nav-link"><i class="fas fa-user-plus"></i>Cadastrar</router-link>
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
  background-color: #f8f9fa; 
}


nav a {
  font-weight: bold;
  color: #2527a5;
  margin-right: 15px;
  text-decoration: none;
  padding: 5px 10px; 
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav a:hover {
  background-color: #e0e0e0; 
}


nav a.router-link-exact-active {
  background-color: #0c82a7;
  color: #fff;
}
</style>
