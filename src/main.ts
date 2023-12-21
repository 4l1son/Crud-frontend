import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSweetalert2 from 'vue-sweetalert2';

const app = createApp(App);

const options = {
  confirmButtonColor: '#3490dc',
  cancelButtonColor: '#d33',
};

app.use(VueSweetalert2, options);

app.use(router).mount('#app');
