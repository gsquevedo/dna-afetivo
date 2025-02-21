<template>
  <div class="form-container">
    <h2>BEM-VINDO AO PAINEL DE AÇÕES</h2>
    <div class="form-group">
      <!-- Formulário de Exposição -->
      <div class="form-item">
        <h2>Adicione uma nova exposição</h2>
        <p class="subtitle">Aqui você pode adicionar uma nova exposição, incluindo o título, data, local, descrição, participantes e imagem. A exposição será salva no nosso banco de dados.</p>
        <form @submit.prevent="addExhibition">
          <input v-model="newExhibition.title" placeholder="Título da Exposição" required />
          
          <input v-model="newExhibition.event" placeholder="Evento" required />

          <input v-model="newExhibition.year" type="number" placeholder="Ano da Exposição" required />
          
          <input v-model="newExhibition.institution" placeholder="Instituição" required />
          
          <textarea v-model="newExhibition.description" placeholder="Descrição"></textarea>

          <input v-model="newExhibition.participants" placeholder="Participantes (Nomes dos Alunos)" />
          
          <button type="submit">Adicionar Exposição</button>
        </form>
      </div>

      <!-- Formulário de Oficina -->
      <div class="form-item">
        <h2>Adicione uma nova oficina</h2>
        <p class="subtitle">Aqui você pode adicionar uma nova oficina, incluindo o título, data, local, descrição, participantes e imagem. A oficina será registrada em nossa plataforma.</p>
        <form @submit.prevent="addWorkshop">
          <input v-model="newWorkshop.title" placeholder="Título da Oficina" required />
          
          <input v-model="newWorkshop.year" type="number" placeholder="Ano da Oficina" required />
          
          <input v-model="newWorkshop.location" placeholder="Local" required />

          <input v-model="newWorkshop.class" placeholder="Classe" required />

          <input v-model="newWorkshop.city" placeholder="Cidade" required />

          <input v-model="newWorkshop.state" placeholder="Estado" required />
          
          <textarea v-model="newWorkshop.description" placeholder="Descrição"> </textarea>

          <input v-model="newWorkshop.participants" placeholder="Participantes (Nomes dos Alunos)" />
          
          <button type="submit">Adicionar Oficina</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, set } from 'firebase/database';

export default {
  name: 'AddActionPage',
  data() {
    return {
      newExhibition: {
        title: '',
        event: '',
        description: '',
        year: '',
        institution: '',
        participants: '',
      },
      newWorkshop: {
        title: '',
        description: '',
        year: '',
        location: '',
        class: '',
        city: '',
        state: '',
        participants: '',
      },
    };
  },
  methods: {
    async addExhibition() {
      const db = this.$database;
      const exhibitionRef = dbRef(db, `exhibitions/${Date.now()}`);

      const exhibitionData = {
        title: this.newExhibition.title,
        event: this.newExhibition.event,
        description: this.newExhibition.description,
        year: this.newExhibition.year,
        institution: this.newExhibition.institution,
        participants: this.newExhibition.participants,
      };

      await set(exhibitionRef, exhibitionData);
      alert('Exposição salva com sucesso!');
      this.clearExhibitionForm();
    },

    async addWorkshop() {
      const db = this.$database;
      const workshopRef = dbRef(db, `workshops/${Date.now()}`);

      const workshopData = {
        title: this.newWorkshop.title,
        description: this.newWorkshop.description,
        year: this.newWorkshop.year,
        location: this.newWorkshop.location,
        class: this.newWorkshop.class,
        city: this.newWorkshop.city,
        state: this.newWorkshop.state,
        participants: this.newWorkshop.participants,
      };

      await set(workshopRef, workshopData);
      alert('Oficina salva com sucesso!');
      this.clearWorkshopForm();
    },

    clearExhibitionForm() {
      this.newExhibition.title = '';
      this.newExhibition.description = '';
      this.newExhibition.event = '';
      this.newExhibition.year = '';
      this.newExhibition.institution = '';
      this.newExhibition.participants = '';
    },

    clearWorkshopForm() {
      this.newWorkshop.title = '';
      this.newWorkshop.description = '';
      this.newWorkshop.year = '';
      this.newWorkshop.location = '';
      this.newWorkshop.class = '';
      this.newWorkshop.city = '';
      this.newWorkshop.state = '';
      this.newWorkshop.participants = '';
    }
  },
};
</script>

<style scoped>
.form-container {
  font-family: Arial, sans-serif;
  background-color: #F5F5DC;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

.form-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.form-item {
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.subtitle {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input, textarea {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .form-item {
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
  }

  .form-group {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}
</style>
