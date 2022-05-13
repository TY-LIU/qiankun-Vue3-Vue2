import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import start from './qiankun';

const app = createApp(App);

start();

app.use(store).use(router).mount('#app');
