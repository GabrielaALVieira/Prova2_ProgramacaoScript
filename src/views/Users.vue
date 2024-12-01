<template>
  <div class="users">
    <header>
      <h1>Lista de Usuários</h1>
      <p>Aqui você verá a lista de usuários cadastrados.</p>
    </header>

    <!-- Formulário para adicionar novo usuário -->
    <section class="add-user">
      <h2>Adicionar Novo Usuário</h2>
      <form @submit.prevent="addUser">
        <label>
          Primeiro Nome:
          <input type="text" v-model="newUser.firstname" required />
        </label>
        <label>
          Último Nome:
          <input type="text" v-model="newUser.lastname" required />
        </label>
        <label>
          Email:
          <input type="email" v-model="newUser.email" required />
        </label>
        <label>
          Telefone:
          <input type="text" v-model="newUser.phone" required />
        </label>
        <button type="submit">Adicionar Usuário</button>
      </form>
    </section>

    <!-- Tabela de usuários -->
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nome Completo</th>
        <th>Email</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name.firstname }} {{ user.name.lastname }}</td>
        <td>{{ user.email }}</td>
        <td>
          <button class="details-btn" @click="viewDetails(user)">Detalhes</button>
          <button class="edit-btn" @click="editUser(user)">Editar</button>
          <button class="delete-btn" @click="deleteUser(user.id)">Excluir</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal para visualização ou edição -->
    <div v-if="selectedUser" class="modal">
      <div class="modal-content">
        <h2 v-if="editing">Editar Usuário</h2>
        <h2 v-else>Detalhes do Usuário</h2>

        <div v-if="!editing">
          <p><strong>ID:</strong> {{ selectedUser.id }}</p>
          <p><strong>Nome:</strong> {{ selectedUser.name.firstname }} {{ selectedUser.name.lastname }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Endereço:</strong> {{ selectedUser.address.street }}, {{ selectedUser.address.city }}</p>
          <p><strong>Telefone:</strong> {{ selectedUser.phone }}</p>
        </div>

        <div v-if="editing">
          <label>
            Primeiro Nome:
            <input type="text" v-model="selectedUser.name.firstname" />
          </label>
          <label>
            Último Nome:
            <input type="text" v-model="selectedUser.name.lastname" />
          </label>
          <label>
            Email:
            <input type="email" v-model="selectedUser.email" />
          </label>
          <label>
            Telefone:
            <input type="text" v-model="selectedUser.phone" />
          </label>
        </div>

        <button v-if="editing" @click="saveUser">Salvar Alterações</button>
        <button class="close-btn" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

---

### Script

<script>
import axios from "axios";

export default {
  name: "UsersView",
  data() {
    return {
      users: [],
      newUser: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
      },
      selectedUser: null,
      editing: false,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    // Fetch lista de usuários
    async fetchUsers() {
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        this.users = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
    // Adicionar novo usuário
    async addUser() {
      try {
        const response = await axios.post("https://fakestoreapi.com/users", {
          name: {
            firstname: this.newUser.firstname,
            lastname: this.newUser.lastname,
          },
          email: this.newUser.email,
          phone: this.newUser.phone,
        });
        this.users.push(response.data); // Atualiza lista de usuários
        this.newUser = { firstname: "", lastname: "", email: "", phone: "" }; // Reseta o formulário
      } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
      }
    },
    // Visualizar detalhes de um usuário
    viewDetails(user) {
      this.selectedUser = user;
      this.editing = false;
    },
    // Editar usuário
    editUser(user) {
      this.selectedUser = JSON.parse(JSON.stringify(user)); // Copia os dados para edição
      this.editing = true;
    },
    // Salvar alterações do usuário
    async saveUser() {
      try {
        const response = await axios.put(`https://fakestoreapi.com/users/${this.selectedUser.id}`, this.selectedUser);
        const index = this.users.findIndex((u) => u.id === this.selectedUser.id);
        this.users[index] = response.data;
        this.closeModal();
      } catch (error) {
        console.error("Erro ao salvar alterações:", error);
      }
    },
    // Excluir usuário
    async deleteUser(id) {
      try {
        await axios.delete(`https://fakestoreapi.com/users/${id}`);
        this.users = this.users.filter((user) => user.id !== id);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    },
    // Fechar modal
    closeModal() {
      this.selectedUser = null;
      this.editing = false;
    },
  },
};
</script>



<style scoped>
.users {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os elementos horizontalmente */
  justify-content: flex-start; /* Centraliza os elementos verticalmente */
  min-height: 100vh;
  background-color: #ffffff;
  text-align: center;
  border-radius: 8px;
  border-collapse: collapse;
}

header {
  text-align: center;
  margin: 0;
  padding: 0;
}

header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;
}

thead {
  background-color: #0056b3; /* Azul */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

thead th {
  padding: 10px;
  font-size: 14px;
  text-align: center;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

tbody td {
  padding: 10px;
  text-align: center;
}

tbody tr:hover {
  background-color: #f0f8ff;
}

button {
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.details-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

/* Estilo para cada label e input */
.edit-form label {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 8px;
}

.edit-form input {
  padding: 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box; /* Para incluir o padding no tamanho total */
  transition: border-color 0.3s ease;
}

/* Mudança de cor ao focar no input */
.edit-form input:focus {
  border-color: #007bff;
  outline: none;
}



</style>


