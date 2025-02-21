<template>
  <div class="publications-container">
    <h1 class="title">Publicações do Projeto</h1>

    <!-- Loader -->
    <div v-if="isLoading" class="loader-container">
      <div class="loader"></div>
    </div>

    <!-- Artigos -->
    <section class="section" v-if="articles.length > 0">
      <h2>Artigos Publicados</h2>
      <div v-for="(publication, index) in articles" :key="publication.id" class="publication-item">
        <div v-if="publication.imageUrl" :style="{ backgroundImage: 'url(' + publication.imageUrl + ')' }" class="publication-image"></div>
        <div class="publication-content">
          <h3>{{ publication.title }}</h3>
          <p><strong>Autores:</strong> {{ publication.authors }}</p>
          <p><strong>Periódico:</strong> {{ publication.journal }} ({{ publication.year }})</p>
          <a v-if="publication.url" :href="publication.url" target="_blank">Leia mais</a>
        </div>
      </div>
    </section>

    <!-- Capítulos de Livros -->
    <section class="section" v-if="bookChapters.length > 0">
      <h2>Capítulos de Livros</h2>
      <div v-for="(publication, index) in bookChapters" :key="publication.id" class="publication-item">
        <div v-if="publication.imageUrl" :style="{ backgroundImage: 'url(' + publication.imageUrl + ')' }" class="publication-image"></div>
        <div class="publication-content">
          <h3>{{ publication.title }}</h3>
          <p><strong>Autores:</strong> {{ publication.authors }}</p>
          <p><strong>Livro:</strong> {{ publication.book }} ({{ publication.year }})</p>
          <a v-if="publication.url" :href="publication.url" target="_blank">Leia mais</a>
        </div>
      </div>
    </section>

    <!-- Dissertações de Mestrado -->
    <section class="section" v-if="masterTheses.length > 0">
      <h2>Dissertações de Mestrado</h2>
      <div v-for="(publication, index) in masterTheses" :key="publication.id" class="publication-item">
        <div class="publication-content">
          <h3>{{ publication.title }}</h3>
          <p><strong>Autores:</strong> {{ publication.authors }}</p>
          <p><strong>Instituição:</strong> {{ publication.institution }} ({{ publication.year }})</p>
          <a v-if="publication.url" :href="publication.url" target="_blank">Leia mais</a>
        </div>
      </div>
    </section>

    <!-- Anais -->
    <section class="section" v-if="proceedings.length > 0">
      <h2>Anais</h2>
      <div v-for="(publication, index) in proceedings" :key="publication.id" class="publication-item">
        <div class="publication-content">
          <h3>{{ publication.title }}</h3>
          <p><strong>Autores:</strong> {{ publication.authors }}</p>
          <p><strong>Evento:</strong> {{ publication.event }} ({{ publication.year }})</p>
          <a v-if="publication.url" :href="publication.url" target="_blank">Leia mais</a>
        </div>
      </div>
    </section>

    <!-- Resumos -->
    <section class="section" v-if="abstracts.length > 0">
      <h2>Resumos</h2>
      <div v-for="(publication, index) in abstracts" :key="publication.id" class="publication-item">
        <div class="publication-content">
          <h3>{{ publication.title }}</h3>
          <p><strong>Autores:</strong> {{ publication.authors }}</p>
          <p><strong>Evento:</strong> {{ publication.event }} ({{ publication.year }})</p>
          <a v-if="publication.url" :href="publication.url" target="_blank">Leia mais</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, get } from "firebase/database";
import { useNuxtApp } from "#app";

export default {
  data() {
    return {
      isLoading: true,
      articles: [],
      bookChapters: [],
      masterTheses: [],
      proceedings: [],
      abstracts: [],
    };
  },
  mounted() {
    this.fetchPublications();
  },
  methods: {
    async fetchPublications() {
      try {
        const { $database } = useNuxtApp();
        const dbRef = ref($database, "posts");

        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();

          for (let id in data) {
            const pub = { id, ...data[id] };

            // Dividindo as publicações por tipo
            switch (pub.type) {
              case "article":
                this.articles.push(pub);
                break;
              case "bookChapter":
                this.bookChapters.push(pub);
                break;
              case "dissertation":
                this.masterTheses.push(pub);
                break;
              case "eventProceeding":
                this.proceedings.push(pub);
                break;
              case "abstract":
                this.abstracts.push(pub);
                break;
              default:
                console.warn(`Tipo desconhecido: ${pub.type}`);
            }
          }
        } else {
          console.warn("Nenhuma publicação encontrada.");
        }
      } catch (error) {
        console.error("Erro ao recuperar publicações: ", error);
      }finally {
        this.isLoading = false; 
      }
    },
  },
};
</script>

<style scoped>
.publications-container {
  background-color: #F5F5DC;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loader {
  border: 4px solid #f3f3f3; 
  border-top: 4px solid #3498db; 
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.section {
  margin-left: 5%;
}

.title {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  padding-top: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding-bottom: 15px;
}

.publication-content {
  z-index: 2; 
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  height: 100%;
}

a {
  color: #1E90FF;
  font-size: 1em;
  color: #0066cc;
  text-decoration: none;
}

h2 {
  color: #2F4858;
  text-transform: uppercase;
  margin-bottom: 10px;
}

h1 {
  text-align: center;
  color: #333;
}

section {
  margin-bottom: 40px;
}

h3 {
  font-size: 1.2em;
  color: #2E8B57;
  margin-bottom: 10px;
  text-transform: uppercase;
}

p {
  margin: 5px 0;
  font-size: 1em;
  color: #555;
}

h2 {
  color: #2F4858;
}

a:hover {
  text-decoration: underline;
}

.publication-item {
  background-color: #fff;
  border: 1px solid #C4A968;
  width: 95%;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
}

@media (max-width: 600px) {
  .publications-container {
    padding: 10px;
  }
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
  }
}

</style>
