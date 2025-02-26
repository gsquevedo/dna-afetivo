import { resolve } from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  components: true,
  modules: ['@pinia/nuxt', 'nuxtjs-naive-ui'],

  runtimeConfig: {
    public: {
      nuxtPublicApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      nuxtPublicAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      nuxtPublicDatabaseUrl: process.env.NUXT_PUBLIC_FIREBASE_DATABASE_URL,
      nuxtPublicProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      nuxtPublicStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      nuxtPublicMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      nuxtPublicAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      nuxtPublicMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }
  },

  app: {
    baseURL: '/',
  },

  ssr: false,
  target: 'static',

  css: [
    '@/assets/css/global.css'
  ],

  plugins: [
    '~/plugins/firebase.client.js',
    '~/plugins/naive-ui.js',
  ],

  hooks: {
    'pages:extend'(routes) {
      routes.push(
        { name: 'IndexPage', path: '/', file: resolve(__dirname, './src/pages/user/Index.vue') },
        { name: 'ProductsPage', path: '/products', file: resolve(__dirname, './src/pages/Products.vue') },
        { name: 'AddProduct', path: '/admin/products', file: resolve(__dirname, './src/pages/admin/AddProduct.vue') },
        { name: 'ActionsPage', path: '/actions', file: resolve(__dirname, './src/pages/Actions.vue') },
        { name: 'AddActionPage', path: '/admin/actions', file: resolve(__dirname, './src/pages/admin/AddActions.vue') },
        { name: 'PublicationsPage', path: '/publications', file: resolve(__dirname, './src/pages/Publications.vue') },
        { name: 'PhotosPage', path: '/photos', file: resolve(__dirname, './src/pages/Photos.vue') },
        { name: 'AddNewPhoto', path: '/admin/photos', file: resolve(__dirname, './src/pages/admin/AddPhotos.vue') },
        { name: 'SignIn', path: '/admin/sign-in', file: resolve(__dirname, './src/pages/admin/SignIn.vue') },
        { name: 'PublicationsAdmin', path: '/admin/publications', file: resolve(__dirname, './src/pages/admin/AddPublications.vue') },
        { name: 'SignUp', path: '/admin/sign-up', file: resolve(__dirname, './src/pages/admin/SignUp.vue') }
      );
    }
  },

  compatibilityDate: '2024-09-21',

  build: {
    transpile: ['firebase'],
  },

  nitro: {
    preset: 'firebase',
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/products', '/admin/products', '/actions', '/admin/actions',
        '/publications', '/photos', '/admin/photos', '/admin/sign-in',
        '/admin/publications', '/admin/sign-up'
      ]
    }
  }
});
