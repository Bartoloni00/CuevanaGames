import { createRouter, createWebHashHistory } from 'vue-router'
import Chat from '../pages/Chat.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
    {path: '/',              component: Home,},
    {path: '/quienes-somos', component: About,},
    {path: '/chat',          component: Chat,},
    {path: '/login',          component: Login,},
    {path: '/registrarse',          component: Register,},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
