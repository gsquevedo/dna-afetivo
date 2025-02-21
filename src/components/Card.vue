<template>
  <div class="card">
    <div class="card-content">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #FFFFFF;
  border: 1px solid #C4A968;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  margin: 10px;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card h2 {
  margin-top: 0;
  font-size: 1.5em;
  color: #2E8B57;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.card p {
  font-size: 1em;
  color: #666;
}
</style>
