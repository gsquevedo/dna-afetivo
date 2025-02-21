<template>
  <div class="page-container">
    <h1>Produtos</h1>
    <p>Bem-vindo à página de produtos. Aqui você encontra os principais materiais do projeto.</p>
    <n-tabs class="tabs-container" v-model:value="activeTab" type="line">
      <!-- Aba Cartilha -->
      <n-tab-pane name="cartilha" tab="Cartilha">
        <h2>Cartilha</h2>
        <div class="images-container">
          <img
            v-for="(image, index) in cartilhaImages"
            :key="index"
            :src="image.mediaUrl"
            alt="Imagem da Cartilha"
            class="image-item"
          />
        </div>
      </n-tab-pane>

      <!-- Aba Vídeos -->
      <n-tab-pane name="videos" tab="Vídeos">
        <h2>Vídeos</h2>
        <div class="videos-container">
          <video
            v-for="(video, index) in videoFiles"
            :key="index"
            controls
            class="video-player"
          >
            <source :src="video.mediaUrl" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
      </n-tab-pane>

      <!-- Aba Jogos Digitais -->
      <n-tab-pane name="jogos-digitais" tab="Jogos Digitais">
        <h2>Jogos Digitais</h2>
        <div class="images-container">
          <div v-for="(jogo, index) in jogosDigitais" :key="index" class="jogo-item">
            <img :src="jogo.mediaUrl" alt="Imagem do Jogo Digital" class="image-item" />
            <p><a :href="jogo.link" target="_blank">Baixar Jogo</a></p>
          </div>
        </div>
      </n-tab-pane>

      <!-- Aba Jogos Impressos -->
      <n-tab-pane name="jogos-impressos" tab="Jogos Impressos">
        <h2>Jogos Impressos</h2>
        <div class="pdf-container">
          <div v-for="(pdf, index) in jogosImpressos" :key="index" class="pdf-card">
            <n-icon class="pdf-icon" size="24">
              <i class="fas fa-file-pdf"></i>
            </n-icon>
            <div class="pdf-details">
              <p class="pdf-name">{{ pdf.name }}</p>
              <a :href="pdf.mediaUrl" target="_blank" class="pdf-link">Baixar PDF</a>
            </div>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import { getDatabase, ref as dbRef, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NTabs, NTabPane } from 'naive-ui';

export default {
  name: 'ProductsPage',
  components: {
    NTabs,
    NTabPane
  },
  data() {
    return {
      activeTab: 'cartilha',
      cartilhaImages: [],
      jogosDigitais: [],
      jogosImpressos: [],
      videoFiles: [],
      user: null,
    };
  },
  mounted() {
    this.fetchProducts();
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      this.user = currentUser || null;
    });
  },
  methods: {
    async fetchProducts() {
      try {
        const db = getDatabase();
        const productsRef = dbRef(db, 'admin/products');
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const products = snapshot.val();
          this.loadCategoryProducts(products);
        } else {
          console.log('Nenhum produto encontrado.');
        }
      } catch (error) {
        console.error('Erro ao recuperar produtos do Firebase:', error);
      }
    },
    loadCategoryProducts(products) {
      this.cartilhaImages = [];
      this.jogosDigitais = [];
      this.jogosImpressos = [];
      this.videoFiles = [];

      if (products['cartilha']) {
        for (const productId in products['cartilha']) {
          const product = products['cartilha'][productId];
          if (product.mediaUrl) {
            this.cartilhaImages.push(product);
          }
        }
      }

      if (products['jogos-digitais']) {
        for (const productId in products['jogos-digitais']) {
          const product = products['jogos-digitais'][productId];
          if (product.mediaUrl && product.link) {
            this.jogosDigitais.push(product);
          }
        }
      }

      if (products['jogos-impressos']) {
        for (const productId in products['jogos-impressos']) {
          const product = products['jogos-impressos'][productId];
          if (product.mediaUrl) {
            this.jogosImpressos.push(product);
          }
        }
      }

      if (products['videos']) {
        for (const productId in products['videos']) {
          const product = products['videos'][productId];
          if (product.mediaUrl) {
            this.videoFiles.push(product);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  max-width: 100%;
  overflow-y: auto;
  background-color: #F5F5DC;
}

.tabs-container {
  width: 100%;
  box-sizing: border-box;
}

.images-container h3 {
  margin-bottom: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center; 
}

.image-grid img {
  width: 100%;
  max-width: 400px; 
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.videos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.video-player,
.youtube-player {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
}

.image-item {
  width: 300px;
  height: 300px; 
  object-fit: cover; 
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
}

.pdf-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.pdf-card {
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  transition: box-shadow 0.3s ease;
}

.pdf-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pdf-icon {
  color: #e74c3c;
  margin-right: 12px;
}

.pdf-details {
  flex: 1;
}

.pdf-name {
  font-weight: bold;
  margin: 0 0 4px;
  font-size: 14px;
  color: #333;
}

.pdf-link {
  font-size: 13px;
  color: #3498db;
  text-decoration: none;
}

.pdf-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .pdf-container {
    grid-template-columns: 1fr;
  }
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .page-container {
    padding: 10px;
  }

  .video-player,
  .youtube-player {
    max-width: 100%;
  }

  .image-grid {
    grid-template-columns: 1fr;
  }

  .image-grid img {
    max-height: 80%;
    max-width: 80%;
    margin: 0 auto;
  }
}
</style>
