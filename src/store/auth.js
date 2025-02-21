import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAdmin: false,
  }),
  actions: {
    login() {
      this.isAdmin = true;
    },
    logout() {
      this.isAdmin = false;
    },
  },
});
