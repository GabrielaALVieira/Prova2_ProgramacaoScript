<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Bem-vindo ao painel principal!</p>
    <nav>
      <ul>
        <li><router-link to="/products">Produtos</router-link></li>
        <li><router-link to="/carts">Carrinhos de compras</router-link></li>
        <li><router-link to="/users">Usuários</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
};
</script>

<style scoped>
/* Layout geral */
.dashboard {
  display: flex;
  text-align: center;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff; /* Fundo claro */
  color: #0155b1; /* Texto escuro */
}

/* Cabeçalho */
header {
  background-color: #007BFF; /* Azul */
  color: white;
  padding: 10px 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Conteúdo principal */
.main-content {
  display: flex;
  flex: 1;
}

/* Menu lateral */
nav {
  width: 100px;
  background-color: #0056b3; /* Azul mais escuro */
  color: white;
  padding: 20px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin: 25px 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

nav a:hover {
  text-decoration: underline;
}

/* Área de conteúdo */
.content {
  flex: 1;
  padding: 20px;
  background-color: #ffffff; /* Fundo claro para contraste */
  border-left: 1px solid #ddd;
}

.content h2 {
  color: #007BFF; /* Azul */
}

.content p {
  margin-top: 10px;
  line-height: 1.6;
}
</style>
