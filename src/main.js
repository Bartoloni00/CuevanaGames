import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'

const cuevanaGames = createApp(App)
cuevanaGames.use(router)
cuevanaGames.mount('#app')
