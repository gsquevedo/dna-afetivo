<template>
  <div class="page-container">
    <div class="photo-panel">
      <h1>BEM-VINDO AO PAINEL DE FOTOS</h1>
      <form @submit.prevent="uploadPhoto" class="upload-form">
        <div class="form-group">
          <label for="photoTitle">Título da Foto</label>
          <input
            type="text"
            v-model="photoTitle"
            id="photoTitle"
            required
            placeholder="Digite o título da foto"
          />
        </div>

        <div class="form-group">
          <label for="photoFile">Selecione a Foto</label>
          <input
            type="file"
            ref="fileInput"
            @change="onFileChange"
            accept="image/*"
            required
          />
        </div>

        <button type="submit" class="upload-button">Adicionar Foto</button>
      </form>

      <div v-if="uploadProgress > 0" class="progress-container">
        <p>Progresso do Upload: {{ uploadProgress }}%</p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export default {
  name: "PhotoPanel",
  data() {
    return {
      photoTitle: "",
      selectedFile: null,
      uploadProgress: 0,
    };
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
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
      } else {
        alert("Por favor, selecione um arquivo de imagem válido.");
        this.clearFileInput();
      }
    },
    clearFileInput() {
      this.selectedFile = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },
    async uploadPhoto() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Você precisa estar logado para fazer o upload de uma foto.");
        return;
      }

      if (!this.selectedFile) {
        alert("Nenhuma foto selecionada!");
        return;
      }

      try {
        const storage = getStorage();
        const fileName = `${Date.now()}_${this.selectedFile.name}`;
        const fileRef = storageRef(storage, `admin/photos/${fileName}`);
        const uploadTask = uploadBytesResumable(fileRef, this.selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            this.uploadProgress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.error("Erro no upload:", error);
            alert("Erro ao fazer upload da foto.");
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            alert(`Foto "${this.photoTitle}" adicionada com sucesso! URL: ${downloadURL}`);
            this.resetForm();
          }
        );
      } catch (error) {
        console.error("Erro no upload:", error);
        alert("Erro ao adicionar a foto.");
      }
    },
    resetForm() {
      this.photoTitle = "";
      this.clearFileInput();
      this.uploadProgress = 0;
    },
  },
};
</script>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #F5F5DC;
}

.photo-panel {
  width: 100%;
  max-width: 600px;
  max-height: 400px;
  padding: 30px;
  margin-top: 50px;
  background: #fff;
  border-radius: 12px;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #000;
  margin-bottom: 20px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #000;
}

input[type="text"],
input[type="file"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.3s;
}

input[type="text"]:focus,
input[type="file"]:focus {
  outline: none;
}

.upload-button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #45a049;
}

.progress-container {
  margin-top: 20px;
}

.progress-bar {
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 5px;
}

.progress-fill {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}

</style>
