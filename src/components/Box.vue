<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <div v-if="isList">
      <ul>
        <li v-for="(item, index) in content" :key="index">
          <strong>{{ item.label }} </strong> {{ item.text }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>{{ content }}</p>
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
    content: {
      type: [String, Array],
      required: true
    }
  },
  computed: {
    isList() {
      return Array.isArray(this.content);
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1 1 calc(50% - 20px);
  box-sizing: border-box;
}

.card h2 {
  margin-top: 0;
}

.card ul {
  padding-left: 20px;
}

.card ul li {
  margin-bottom: 10px;
}
</style>
