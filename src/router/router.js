import { createRouter, createWebHashHistory } from 'vue-router'
import Chat from '../pages/Chat.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

const routes = [
    {path: '/',              component: Home,},
    {path: '/quienes-somos', component: About,},
    {path: '/chat',          component: Chat,},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
