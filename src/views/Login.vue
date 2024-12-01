<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">

      <div>
        <label for="username">Username</label>
        <input type="text" v-model="username" placeholder="Username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <button type="submit">Login</button>

    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        console.log("Enviando dados para login:", this.username, this.password);

        const response = await axios.post('https://fakestoreapi.com/auth/login', {
          username: this.username,
          password: this.password,
        });
        console.log("Resposta da API:", response.data);

        if (response.data.token) {
          // Armazenar o token e redirecionar para o painel
          console.log("Token recebido:", response.data.token);
          localStorage.setItem('authToken', response.data.token);
          this.$router.push({ name: 'Dashboard' });
        }
      } catch (error) {
        // Log detalhado do erro
        if (error.response) {
          console.error("Erro no login - Resposta do servidor:", error.response);
          alert("Erro no login. Detalhes no console.");
        } else if (error.request) {
          console.error("Erro no login - Sem resposta:", error.request);
          alert("Erro no login. Sem resposta do servidor.");
        } else {
          console.error("Erro no login - Outro erro:", error.message);
          alert("Erro no login. Tente novamente.");
        }
      }
    }
  }
};
</script>

<style scoped>
/* Estilização do fundo azul */
.login {
  background-color: #007BFF; /* Azul */
  color: white; /* Cor do texto para contraste */
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.login input {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login button {
  width: 50%;
  padding: 10px;
  background-color: white;
  color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login button:hover {
  background-color: #0056b3;
  color: white;
}
</style>
