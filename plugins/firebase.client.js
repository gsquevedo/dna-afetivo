//firebase.client.js
import { applyPlugins, defineNuxtPlugin, useRuntimeConfig } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export default defineNuxtPlugin(nuxtApp => {
  try {
    const runtimeConfig = useRuntimeConfig();

    const firebaseConfig = {
      apiKey: runtimeConfig.public.nuxtPublicApiKey,
      authDomain: runtimeConfig.public.nuxtPublicAuthDomain,
      projectId: runtimeConfig.public.nuxtPublicProjectId,
      storageBucket: runtimeConfig.public.nuxtPublicStorageBucket,
      messagingSenderId: runtimeConfig.public.nuxtPublicMessagingSenderId,
      appId: runtimeConfig.public.nuxtPublicAppId,
      measurementId: runtimeConfig.public.nuxtPublicMeasurementId,
      databaseUrl: runtimeConfig.public.nuxtPublicDatabaseUrl
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const database = getDatabase(app)
    const storage = getStorage(app);

    nuxtApp.provide('auth', auth);
    nuxtApp.provide('signInWithEmailAndPassword', signInWithEmailAndPassword);
    nuxtApp.provide('createUserWithEmailAndPassword', createUserWithEmailAndPassword);
    nuxtApp.provide('database', database)
    nuxtApp.provide('storage', storage);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
});
