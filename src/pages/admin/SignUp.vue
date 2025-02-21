<template>
  <div class="page">
    <form @submit.prevent="registerUser" class="formLogin">
      <h1>Crie um novo usuário!</h1>
      <p>Preencha os dados abaixo para criar um novo usuário.</p>
      
      <label for="name">Nome</label>
      <input type="text" v-model="name" placeholder="Digite seu nome" required />

      <label for="email">E-mail</label>
      <input type="email" v-model="email" placeholder="Digite seu e-mail" required />

      <label for="password">Senha</label>
      <input type="password" v-model="password" placeholder="Digite sua senha" required />

      <input type="submit" value="Registrar" class="btn" />

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref(null);

const registerUser = async () => {
  try {
    const { $auth, $createUserWithEmailAndPassword } = useNuxtApp();

    // Cria o usuário no Firebase Authentication
    const userCredential = await $createUserWithEmailAndPassword($auth, email.value, password.value);
    const user = userCredential.user;

    alert("Usuário registrado com sucesso!");

    // Limpa os campos após o registro
    name.value = '';
    email.value = '';
    password.value = '';
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    errorMessage.value = 'Erro ao registrar usuário. Tente novamente.';
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  color: #023047;
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.formLogin {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 7px;
  padding: 40px;
  box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.4);
  gap: 5px;
}

.formLogin h1 {
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 2.3em;
  text-align: center;
}

.formLogin p {
  font-size: 14px;
  color: #666;
  margin-bottom: 25px;
  text-align: center;
}

.formLogin input {
  padding: 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 5px;
  border-radius: 4px;
  transition: all linear 160ms;
  outline: none;
}

.formLogin label {
  font-size: 14px;
  font-weight: 600;
}

.formLogin .btn {
  background-color: #D96459;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  transition: all linear 160ms;
  cursor: pointer;
}

.formLogin .btn:hover {
  transform: scale(1.05);
  background-color: #D96459;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
