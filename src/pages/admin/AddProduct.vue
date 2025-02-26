<template>
  <div class="add-product">
    <!-- Welcome Section -->
    <div class="welcome-section">
      <h2>BEM-VINDO AO PAINEL DE PRODUTOS</h2>
    </div>

    <!-- Product Form Section -->
    <div class="form-section">
      <form @submit.prevent="handleSave">
        <div>
          <label for="name">Nome do Produto</label>
          <input type="text" v-model="newProduct.name" id="name" required />
        </div>

        <div>
          <label for="description">Descrição</label>
          <textarea v-model="newProduct.description" id="description" required></textarea>
        </div>

        <div>
          <label for="category">Categoria</label>
          <select v-model="newProduct.category" id="category" @change="updateFileAccept">
            <option value="cartilha">Cartilha</option>
            <option value="jogos-digitais">Jogos Digitais</option>
            <option value="jogos-impressos">Jogos Impressos</option>
            <option value="videos">Vídeos</option>
          </select>
        </div>

        <div>
          <label for="file">Upload de Arquivo</label>
          <input 
            type="file" 
            ref="fileInput" 
            @change="onFileChange" 
            :accept="fileAccept" 
            required 
          />
        </div>

        <div>
          <label for="link">Link do Produto (opcional)</label>
          <input type="url" v-model="newProduct.link" id="link" placeholder="https://example.com" />
        </div>

        <button type="submit">Salvar Produto</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'AddProduct',
  data() {
    return {
      user: null,
      newProduct: {
        name: '',
        description: '',
        category: 'cartilha',
        link: '', 
      },
      selectedFile: null,
      fileAccept: 'image/*,video/*',
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      this.user = currentUser || null;
    });
  },
  created() {
    this.checkAuthStatus();
  },
  methods: {
    async checkAuthStatus() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        this.$router.push('/user'); // Redireciona para a página de login, se necessário
      }
    },
    updateFileAccept() {
      if (this.newProduct.category === 'jogos-impressos') {
        this.fileAccept = 'application/pdf';
      } else {
        this.fileAccept = 'image/*,video/*';
      }
      this.clearFileInput();
    },

    async handleSave() {
      if (!this.selectedFile) {
        alert('Por favor, faça o upload de um arquivo.');
        return;
      }

      if (!this.user) {
        alert('Você precisa estar logado para adicionar um produto.');
        return;
      }

      try {
        const storage = getStorage();
        const fileRef = storageRef(storage, `admin/products/${this.newProduct.category}/${Date.now()}_${this.selectedFile.name}`);
        const snapshot = await uploadBytes(fileRef, this.selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const db = this.$database;
        const productRef = dbRef(db, `admin/products/${this.newProduct.category}/${Date.now()}`);

        const productData = {
          name: this.newProduct.name,
          description: this.newProduct.description,
          category: this.newProduct.category,
          mediaUrl: downloadURL,
          link: this.newProduct.link || null,
        };

        await set(productRef, productData);
        alert('Produto salvo com sucesso!');
        this.clearForm();
      } catch (error) {
        console.error('Erro ao salvar o produto no Firebase:', error);
        alert('Erro ao salvar o produto!');
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const isPdf = file.type === 'application/pdf';
        const isImageOrVideo = file.type.startsWith('image/') || file.type.startsWith('video/');

        if (
          (this.newProduct.category === 'jogos-impressos' && isPdf) ||
          (this.newProduct.category !== 'jogos-impressos' && isImageOrVideo)
        ) {
          this.selectedFile = file;
        } else {
          alert('Tipo de arquivo inválido para a categoria selecionada.');
          this.clearFileInput();
        }
      }
    },

    clearFileInput() {
      this.selectedFile = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },

    clearForm() {
      this.newProduct = {
        name: '',
        description: '',
        category: 'cartilha',
        link: '',
      };
      this.clearFileInput();
    },
  },
};
</script>

<style scoped>
.add-product {
  font-family: 'Arial', sans-serif;
  background-color: #F5F5DC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.welcome-section {
  text-align: center;
  margin-bottom: 30px;
}

.warning-message {
  text-align: center;
  color: red;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-section {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 700px;
}

form div {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #000;
  font-size: 1rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 12px 20px;
  background-color: #27ae60;
  width: 100%;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2ecc71;
}
</style>
