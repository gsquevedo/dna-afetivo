<template>
  <div class="card-container">
    <h2>Exposições</h2>
    <div class="card-group">
      <Card
        v-for="item in exhibitions"
        :key="item.id"
        :title="item.title"
        :description="`${item.event}. ${item.year}. Instituição promotora: ${item.institution}.`"
      />
    </div>

    <h2>Oficinas</h2>
    <div class="card-group">
      <Card
        v-for="item in workshops"
        :key="item.id"
        :title="item.title"
        :description="`${item.location} (${item.class}). ${item.city}, ${item.state}. ${item.year}.`"
      />
    </div>
  </div>
</template>

<script>
import { ref, onValue } from 'firebase/database';
import Card from '../components/Card.vue';

export default {
  name: 'ActionPage',
  components: {
    Card
  },
  data() {
    return {
      exhibitions: [],
      workshops: []
    };
  },
  mounted() {
    this.fetchActions();
  },
  methods: {
    fetchActions() {
      const db = this.$database;
      
      // Buscar exposições
      const exhibitionsRef = ref(db, 'exhibitions');
      onValue(exhibitionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.exhibitions = Object.keys(data).map(id => ({ id, ...data[id] }));
        }
      });
      
      // Buscar oficinas
      const workshopsRef = ref(db, 'workshops');
      onValue(workshopsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.workshops = Object.keys(data).map(id => ({ id, ...data[id] }));
        }
      });
    }
  }
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  background-color: #F5F5DC;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

h2 {
  color: #2F4858;
  text-transform: uppercase;
  margin-bottom: 10px;
}
</style>
