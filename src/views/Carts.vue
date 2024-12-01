<template>
  <div class="carts">
    <header>
      <h1>Carrinhos de Compras</h1>
      <p>Aqui você verá a lista de carrinhos de compras.</p>
    </header>

    <!-- Filtros -->
    <div class="filters">
      <label>
        Filtrar por Usuário:
        <select v-model="selectedUser" @change="filterCarts">
          <option value="">Todos</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name.firstname }} {{ user.name.lastname }}
          </option>
        </select>
      </label>
      <label>
        Filtrar por Data:
        <input type="date" v-model="selectedDate" @change="filterCarts" />
      </label>
    </div>

    <!-- Lista de Carrinhos -->
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Usuário</th>
        <th>Data</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cart in filteredCarts" :key="cart.id">
        <td>{{ cart.id }}</td>
        <td>
          {{ getUserFullName(cart.userId) }}
        </td>
        <td>{{ cart.date }}</td>
        <td>
          <button @click="viewCartDetails(cart)" class="details-btn">Detalhes</button>
          <button @click="deleteCart(cart.id)" class="delete-btn">Excluir</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal de Detalhes -->
    <div v-if="showCartModal" class="modal">
      <div class="modal-content">
        <h2>Detalhes do Carrinho (ID: {{ selectedCart.id }})</h2>
        <p>Usuário: {{ getUserFullName(selectedCart.userId) }}</p>
        <p>Data: {{ selectedCart.date }}</p>

        <table>
          <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in selectedCart.products" :key="item.productId">
            <td>{{ getProductName(item.productId) }}</td>
            <td>
              <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  @change="updateCartItem(item)"
              />
            </td>
            <td>
              <button @click="removeCartItem(item.productId)" class="delete-btn">Remover</button>
            </td>
          </tr>
          </tbody>
        </table>

        <button @click="closeCartModal" class="close-btn">Fechar</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "CartsView",
  data() {
    return {
      carts: [],
      filteredCarts: [],
      users: [],
      products: [],
      selectedUser: "",
      selectedDate: "",
      showCartModal: false,
      selectedCart: null,
    };
  },
  async created() {
    await this.fetchCarts();
    await this.fetchUsers();
    await this.fetchProducts();
    this.filteredCarts = [...this.carts];
  },
  methods: {
    async fetchCarts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/carts");
        this.carts = response.data;
      } catch (error) {
        console.error("Erro ao buscar carrinhos:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        this.users = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    },
    getUserFullName(userId) {
      const user = this.users.find((u) => u.id === userId);
      return user ? `${user.name.firstname} ${user.name.lastname}` : "Desconhecido";
    },
    getProductName(productId) {
      const product = this.products.find((p) => p.id === productId);
      return product ? product.title : "Produto desconhecido";
    },
    filterCarts() {
      this.filteredCarts = this.carts.filter((cart) => {
        const userFilter = this.selectedUser
            ? cart.userId === Number(this.selectedUser)
            : true;
        const dateFilter = this.selectedDate
            ? cart.date.startsWith(this.selectedDate)
            : true;
        return userFilter && dateFilter;
      });
    },
    viewCartDetails(cart) {
      this.selectedCart = { ...cart, products: [...cart.products] };
      this.showCartModal = true;
    },
    closeCartModal() {
      this.showCartModal = false;
      this.selectedCart = null;
    },
    async updateCartItem(item) {
      try {
        await axios.put(`https://fakestoreapi.com/carts/${this.selectedCart.id}`, {
          ...this.selectedCart,
        });
        console.log("Item atualizado:", item);
      } catch (error) {
        console.error("Erro ao atualizar item:", error);
      }
    },
    removeCartItem(productId) {
      this.selectedCart.products = this.selectedCart.products.filter(
          (item) => item.productId !== productId
      );
    },
    async deleteCart(cartId) {
      try {
        await axios.delete(`https://fakestoreapi.com/carts/${cartId}`);
        this.carts = this.carts.filter((cart) => cart.id !== cartId);
        this.filteredCarts = [...this.carts];
      } catch (error) {
        console.error("Erro ao excluir carrinho:", error);
      }
    },
  },
};
</script>


<style scoped>
.carts {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza os elementos horizontalmente */
  justify-content: flex-start; /* Centraliza os elementos verticalmente */
  min-height: 100vh;
  background-color: #ffffff;
  text-align: center;
  padding: 10px;
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
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;

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

tbody tr {
  border-bottom: 1px solid #ddd;
  text-align: center;
}

tbody tr:hover {
  background-color: #e8f4ff; /* Cor ao passar o mouse */
}

tbody td {
  padding: 12px 15px;
  font-size: 14px;
  color: #333;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
}

.filters label {
  display: flex;
  flex-direction: column;
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
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.details-btn {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.details-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545; /* Vermelho */
  color: white;
}

.delete-btn:hover {
  background-color: #b02a37; /* Vermelho mais escuro */
}

.close-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.close-btn:hover {
  background-color: #5a6268;
}

p {
  font-size: 18px;
  color: #333;
  max-width: 600px;
  line-height: 1.5;
}
</style>





