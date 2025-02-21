<template>
  <div class="admin-dashboard">
    <h2>BEM-VINDO AO PAINEL DE PUBLICAÇÕES</h2>

    <div class="form-section">
      <form @submit.prevent="handleSave">
        <label for="type">Tipo de Publicação:</label>
        <select v-model="newPublication.type" id="type" required>
          <option value="article">Artigo</option>
          <option value="bookChapter">Capítulo de Livro</option>
          <option value="dissertation">Dissertação</option>
          <option value="eventProceeding">Anais de Evento</option>
          <option value="abstract">Resumo</option>
        </select>

        <!-- Campos Dinâmicos conforme o Tipo -->
        <div v-if="newPublication.type === 'article'">
          <div class="input-group">
            <label for="title">Título do Artigo:</label>
            <input v-model="newPublication.title" type="text" id="title" required>
          </div>
          <div class="input-group">
            <label for="authors">Autores:</label>
            <input v-model="newPublication.authors" type="text" id="authors" required>
          </div>
          <div class="input-group">
            <label for="journal">Periódico:</label>
            <input v-model="newPublication.journal" type="text" id="journal">
          </div>
          <div class="input-group">
            <label for="year">Ano de Publicação:</label>
            <input v-model="newPublication.year" type="number" id="year">
          </div>
          <div class="input-group">
            <label for="url">Link do Artigo:</label>
            <input v-model="newPublication.url" type="url" id="url">
          </div>
        </div>

        <div v-if="newPublication.type === 'bookChapter'">
          <div class="input-group">
            <label for="bookTitle">Título do Capítulo:</label>
            <input v-model="newPublication.title" type="text" id="bookTitle" required>
          </div>
          <div class="input-group">
            <label for="authors">Autores:</label>
            <input v-model="newPublication.authors" type="text" id="authors" required>
          </div>
          <div class="input-group">
            <label for="book">Livro:</label>
            <input v-model="newPublication.book" type="text" id="book">
          </div>
          <div class="input-group">
            <label for="year">Ano de Publicação:</label>
            <input v-model="newPublication.year" type="number" id="year">
          </div>
          <div class="input-group">
            <label for="url">Link do Capítulo:</label>
            <input v-model="newPublication.url" type="url" id="url">
          </div>
        </div>

        <div v-if="newPublication.type === 'dissertation'">
          <div class="input-group">
            <label for="title">Título da Dissertação:</label>
            <input v-model="newPublication.title" type="text" id="title" required>
          </div>
          <div class="input-group">
            <label for="author">Autor:</label>
            <input v-model="newPublication.authors" type="text" id="author" required>
          </div>
          <div class="input-group">
            <label for="institution">Instituição:</label>
            <input v-model="newPublication.institution" type="text" id="institution">
          </div>
          <div class="input-group">
            <label for="year">Ano de Publicação:</label>
            <input v-model="newPublication.year" type="number" id="year">
          </div>
          <div class="input-group">
            <label for="url">Link da Dissertação:</label>
            <input v-model="newPublication.url" type="url" id="url">
          </div>
        </div>

        <div v-if="newPublication.type === 'eventProceeding'">
          <div class="input-group">
            <label for="title">Título do Anais:</label>
            <input v-model="newPublication.title" type="text" id="title" required>
          </div>
          <div class="input-group">
            <label for="authors">Autores:</label>
            <input v-model="newPublication.authors" type="text" id="authors" required>
          </div>
          <div class="input-group">
            <label for="event">Evento:</label>
            <input v-model="newPublication.event" type="text" id="event">
          </div>
          <div class="input-group">
            <label for="year">Ano de Publicação:</label>
            <input v-model="newPublication.year" type="number" id="year">
          </div>
          <div class="input-group">
            <label for="url">Link do Anais:</label>
            <input v-model="newPublication.url" type="url" id="url">
          </div>
        </div>

        <div v-if="newPublication.type === 'abstract'">
          <div class="input-group">
            <label for="title">Título do Resumo:</label>
            <input v-model="newPublication.title" type="text" id="title" required>
          </div>
          <div class="input-group">
            <label for="authors">Autores:</label>
            <input v-model="newPublication.authors" type="text" id="authors" required>
          </div>
          <div class="input-group">
            <label for="event">Evento:</label>
            <input v-model="newPublication.event" type="text" id="event">
          </div>
          <div class="input-group">
            <label for="year">Ano de Publicação:</label>
            <input v-model="newPublication.year" type="number" id="year">
          </div>
        </div>

        <div class="button-group">
          <button type="submit">Adicionar Publicação</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, set } from 'firebase/database';

export default {
  name: 'PublicationsAdmin',
  data() {
    return {
      newPublication: {
        type: 'article',
        title: '',
        authors: '',
        journal: '',
        year: '',
        url: '',
        book: '',
        event: '',
        institution: '',
      },
      imageUrl: '',
    };
  },
  methods: {
    async handleSave() {
      try {
        const db = this.$database;
        const contentRef = ref(db, 'posts/' + Date.now());

        const publicationData = {
          type: this.newPublication.type,
          title: this.newPublication.title,
          authors: this.newPublication.authors,
          year: this.newPublication.year,
          url: this.newPublication.url,
          imageUrl: this.imageUrl,
        };

        if (this.newPublication.type === 'article') {
          publicationData.journal = this.newPublication.journal;
        } else if (this.newPublication.type === 'bookChapter') {
          publicationData.book = this.newPublication.book;
        } else if (this.newPublication.type === 'dissertation') {
          publicationData.institution = this.newPublication.institution;
        } else if (this.newPublication.type === 'eventProceeding') {
          publicationData.event = this.newPublication.event;
        } else if (this.newPublication.type === 'abstract') {
          publicationData.event = this.newPublication.event;
        }

        // Salvando os dados no Firebase
        await set(contentRef, publicationData);
        console.log('Dados salvos com sucesso!');
        alert('Dados salvos com sucesso!');
        this.clearForm();
      } catch (error) {
        console.error('Erro ao salvar os dados no Firebase:', error);
        alert('Erro ao salvar os dados no Firebase!');
      }
    },

    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    clearForm() {
      this.newPublication = {
        type: 'article',
        title: '',
        authors: '',
        journal: '',
        year: '',
        url: '',
        book: '',
        event: '',
        institution: '',
      };
      this.imageUrl = '';
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  font-family: Arial, sans-serif;
  background-color: #F5F5DC;
  width: auto;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

h2 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
}

.form-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 70%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

input[type="text"],
input[type="number"],
input[type="url"],
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-group {
  margin-bottom: 15px;
}

.button-group {
  text-align: center;
}

button {
  background-color: #45a049;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 15px;
  }

  h2 {
    font-size: 28px;
  }
}
</style>
