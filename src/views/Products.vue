<template>
  <div class="products">
    <header>
      <h1>Produtos</h1>
      <p>Aqui você verá todos os produtos da loja:</p>
    </header>

    <!-- Filtros -->
    <div class="filters">
      <select v-model="selectedCategory" @change="filterProducts">
        <option value="">Todas as Categorias</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <select v-model="sortOption" @change="sortProducts">
        <option value="">Ordenar</option>
        <option value="price">Preço</option>
        <option value="rating">Classificação</option>
      </select>
    </div>

    <!-- Tabela -->
    <table>
      <thead>
      <tr>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Preço</th>
        <th>Classificação</th>
        <th>Editar/Excluir</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in filteredProducts" :key="product.id">
        <td>{{ product.title }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.price.toFixed(2) }}</td>
        <td>{{ product.rating.rate }}</td>
        <td>
          <button class="edit-btn" @click="openEditModal(product)">Editar</button>
          <button class="delete-btn" @click="deleteProduct(product.id)">Excluir</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal de Edição -->
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <h2>Editar Produto</h2>
        <label>
          Nome:
          <input v-model="selectedProduct.title" />
        </label>
        <label>
          Categoria:
          <input v-model="selectedProduct.category" />
        </label>
        <label>
          Preço:
          <input v-model.number="selectedProduct.price" type="number" />
        </label>
        <button @click="updateProduct">Salvar</button>
        <button @click="closeEditModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductsView",
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: "",
      sortOption: "",
      filteredProducts: [],
      isEditModalOpen: false,
      selectedProduct: null,
    };
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
        this.filteredProducts = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    filterProducts() {
      this.filteredProducts = this.selectedCategory
          ? this.products.filter((product) => product.category === this.selectedCategory)
          : this.products;
    },
    sortProducts() {
      const sortKey = this.sortOption;
      if (sortKey) {
        this.filteredProducts = [...this.filteredProducts].sort((a, b) =>
            sortKey === "price"
                ? a.price - b.price
                : a.rating.rate - b.rating.rate
        );
      }
    },
    openEditModal(product) {
      this.selectedProduct = { ...product };
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
    },
    async updateProduct() {
      try {
        const response = await axios.put(
            `https://fakestoreapi.com/products/${this.selectedProduct.id}`,
            this.selectedProduct
        );
        console.log("Product updated:", response.data);
        this.closeEditModal();
        this.fetchProducts(); // Atualiza a lista de produtos
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
        this.products = this.products.filter((product) => product.id !== id);
        this.filteredProducts = this.filteredProducts.filter((product) => product.id !== id);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
  },
};
</script>


<style scoped>
/* Estilo geral da página */
.products {
  padding: 10px;
  background-color: #f4f4f9; /* Fundo claro */
  min-height: 100vh;
  text-align: center;
  flex-direction: column;
  border-collapse: collapse;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

/* Cabeçalho */
header {
  text-align: center;
  margin: 0;
  padding: 0;
}

header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}
.filters {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espaçamento horizontal entre os filtros */
  margin-bottom: 30px; /* Espaçamento abaixo dos filtros */
}

.filters label {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

.filters select {
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

/* Estilo da tabela */

thead {
  background-color: #0056b3; /* Azul */
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

thead th:last-child {
  border-right: none; /* Remove a borda da última célula */
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
  background-color: #cce0ff; /* Cor de fundo ao passar o mouse */
}

td {
  padding: 12px 15px;
  color: #333;
  font-size: 14px;
}

/* Botões */
button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #0056b3; /* Azul */
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #0056b3; /* Azul mais escuro */
}

.delete-btn {
  background-color: #dc3545; /* Vermelho */
  color: white;
}

.delete-btn:hover {
  background-color: #b02a37; /* Vermelho mais escuro */
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
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-bottom: 15px;
}

.modal-content label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.save-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #b02a37;
}

</style>