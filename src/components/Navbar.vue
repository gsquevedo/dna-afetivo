<template>
  <div class="navbar">
    <nav class="navbar-content">
      <div class="navbar-logo">
        <img :src="logo" alt="Logo" />
      </div>

      <div class="menu-toggle" @click="toggleMenu">
        <n-icon size="40">
          <MenuIcon v-if="!isMenuOpen" />
          <CloseIcon v-else />
        </n-icon>
      </div>

      <ul :class="['navbar-links', { open: isMenuOpen }]">
        <li><nuxt-link to="/" exact active-class="active">Sobre</nuxt-link></li>
        <li v-if="isAdmin" ><nuxt-link to="/admin/products" active-class="active">Produtos</nuxt-link></li>
        <li v-if="isAdmin"><nuxt-link to="/admin/photos" active-class="active">Fotos</nuxt-link></li>
        <li v-if="!isAdmin"><nuxt-link to="/photos" active-class="active">Fotos</nuxt-link></li>
        <li v-if="!isAdmin"><nuxt-link to="/products" active-class="active">Produtos</nuxt-link></li>
        <li v-if="isAdmin" ><nuxt-link to="/admin/actions" active-class="active">Ações</nuxt-link></li>
        <li v-if="!isAdmin"><nuxt-link to="/actions" active-class="active">Ações</nuxt-link></li>
        <li v-if="isAdmin" ><nuxt-link to="/admin/publications" active-class="active">Publicações</nuxt-link></li>
        <li v-if="!isAdmin"><nuxt-link to="/publications" active-class="active">Publicações</nuxt-link></li>
        <li v-if="!isAdmin"><nuxt-link to="/admin/sign-in" active-class="active">Login</nuxt-link></li>
        <li v-if="isAdmin" @click="logout"><nuxt-link to="/" active-class="active">Sair</nuxt-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
import logo from "../../assets/logo_icone.png";
import { Menu as MenuIcon, Close as CloseIcon } from '@vicons/ionicons5';
import { NIcon } from "naive-ui";
import { useNuxtApp } from '#app';
import { useAuthStore } from '../store/auth';

export default {
  data() {
    return {
      logo,
      isMenuOpen: false,
    };
  },
  computed: {
    isAdmin() {
      const authStore = useAuthStore();
      return authStore.isAdmin;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async logout() {
      const { $auth } = useNuxtApp();

      try {
        await $auth.signOut()
        this.$router.push('/admin/sign-in');
      } catch (error) {
        console.error('Erro ao sair:', error);
      }
    },
  },
  components: {
    MenuIcon,
    CloseIcon,
    NIcon,
  },
};
</script>

<style scoped>
.navbar {
  margin: 0;
  padding: 0;
  background-color: #C4A968;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  flex-wrap: wrap;
}

.navbar-logo img {
  width: 110px;
  height: auto;
}

.navbar-links {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  transition: max-height 0.3s ease-out;
}

.navbar-links li {
  margin-left: 30px;
}

a {
  text-decoration: none;
  color: inherit;
  padding: 10px 15px;
  transition: background-color 0.2s ease, padding 0.2s ease;
}

a:hover {
  background-color: #E1D4B3;
  padding: 15px 25px;
  border-radius: 10px;
}

.active {
  font-weight: bold;
}

.menu-toggle {
  display: none;
}

.menu-toggle n-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .navbar-links {
    flex-direction: column;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .navbar-links.open {
    max-height: 500px;
  }

  .navbar-links li {
    margin: 10px 0;
    width: 100%;
  }

  .navbar-links a {
    padding: 10px 20px;
    width: 100%;
    display: block;
  }

  .menu-toggle {
    display: flex;
  }
}

</style>