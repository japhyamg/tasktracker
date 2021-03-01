require('./bootstrap');

import {createApp} from 'vue';
// import VueRouter from 'vue-router'
import App from './App.vue'

import router from './router'

// const app = createApp({
//     router,
//     el:'#app',
//     components: { App }
// });

createApp(App).use(router).mount('#app')
