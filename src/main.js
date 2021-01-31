import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Loader from '@/components/app/Loader';
import tooltipDirective from '@/directives/tooltip.directive';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import messagePlugin from '@/utils/message.plugin';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyD3lKzaJd7eY3b_chvqn4SL4HRMJWmww6c",
  authDomain: "vue-pet-project-601f9.firebaseapp.com",
  databaseURL: "https://vue-pet-project-601f9-default-rtdb.europe-west1.firebasedatabase.app",
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


