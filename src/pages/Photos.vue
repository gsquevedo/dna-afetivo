<template>
  <div class="album-container">
    <h1>Álbum de Fotos</h1>
    <div v-if="loading" class="loading">Carregando fotos...</div>
    <div v-else class="album">
      <div v-for="(image, index) in images" :key="index" class="album-item">
        <img :src="image" :alt="'Imagem ' + (index + 1)" />
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default {
  name: "PhotosPage",
  data() {
    return {
      images: [],
      loading: true,
    };
  },
  created() {
    this.loadImages();
  },
  methods: {
    async loadImages() {
      const storage = getStorage();
      const storageRef = ref(storage, "admin/photos/");
      try {
        const result = await listAll(storageRef);
        const imageUrls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        );
        this.images = imageUrls;
      } catch (error) {
        console.error("Erro ao carregar as imagens:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.album-container {
  text-align: center;
  padding: 20px;
  height: 100%;
  width: 100%; 
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F5F5DC;
}


h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
}

.loading {
  font-size: 1.5rem;
  color: #555;
  margin-top: 50px;
  animation: blink 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

/* Animação de piscar */
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.album {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 10px;
  flex-grow: 1;
}

.album-item {
  background-color: #f0f8ff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.album-item:hover {
  transform: scale(1.05);
}

.album-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

/* Estilo para telas menores que 600px */
@media (max-width: 600px) {
  .album-container {
    min-height: 100vh; 
  }

  .album {
    grid-template-columns: 1fr;
  }
}
</style>
