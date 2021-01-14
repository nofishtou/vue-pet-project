import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyD3lKzaJd7eY3b_chvqn4SL4HRMJWmww6c",
  authDomain: "vue-pet-project-601f9.firebaseapp.com",
  projectId: "vue-pet-project-601f9",
  storageBucket: "vue-pet-project-601f9.appspot.com",
  messagingSenderId: "531863599016",
  appId: "1:531863599016:web:147ceaeaf5c7203c2c8f9d",
  measurementId: "G-L7T81CHMSE"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});


