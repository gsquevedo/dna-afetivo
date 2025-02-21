<template>
  <div :class="['team-member', { 'right': isRight, 'left': !isRight }]">
    <div class="photo-container">
      <img :src="photo" alt="Foto do integrante" class="photo"/>
    </div>
    <div class="info">
      <h3>{{ name }}</h3>
      <p><strong>Cargo:</strong> {{ role }}</p>
      <p><strong>Formação Acadêmica:</strong> {{ education }}</p>
      <p><strong>Principal Contribuição:</strong> {{ contribution }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMember',
  props: {
    name: String,
    role: String,
    education: String,
    contribution: String,
    photo: String,
    index: Number
  },
  computed: {
    isRight() {
      return this.index % 2 === 0;
    }
  }
};
</script>

<style scoped>
.team-member {
  display: flex;
  border: 1px solid rgba(221, 221, 221, 0.5); 
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5); 
  margin-bottom: 20px;
  transition: background-color 0.3s;
  width: 100%;
  margin-bottom: 15px;  
}

.team-member.right {
  flex-direction: row;
  justify-content: flex-start;
}

.team-member.left {
  flex-direction: row-reverse; 
  justify-content: flex-end;
}

.photo-container {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  flex: 1;
  margin-left: 20px;
}

.team-member.left .info {
  margin-left: 0;
  margin-right: 20px;
}

.info h3 {
  margin-top: 0;
}

.info p {
  margin: 5px 0;
}

/* Responsividade para telas menores */
@media (max-width: 768px) {
  .team-member {
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .team-member.right,
  .team-member.left {
    flex-direction: column;
  }

  .photo-container {
    margin-bottom: 15px;
  }

  .info {
    margin-left: 0;
    margin-right: 0;
  }

  .info h3 {
    font-size: 1.2em;
  }

  .photo {
    width: 120px; 
    height: 120px;
  }
}

</style>
