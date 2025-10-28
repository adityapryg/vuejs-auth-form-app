import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

// Check for existing authentication on app start
store.dispatch('checkAuth');

app.use(store);
app.use(router);
app.mount('#app');