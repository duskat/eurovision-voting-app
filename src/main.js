import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your existing router configuration
import './style.css';
import './styles/global.css'; // Import the global styles

const app = createApp(App);
app.use(router);
app.mount('#app');
