import { createRouter, createWebHashHistory } from 'vue-router'
import { subscribeToAuth } from '../services/auth.js'
import Chat from '../pages/Chat.vue'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import UserProfile from '../pages/UserProfile.vue'
import PrivateChat from '../pages/PrivateChat.vue'

const routes = [
    {path: '/',              component: Home,},
    {path: '/quienes-somos', component: About,},
    {path: '/chat',          component: Chat, meta: {requiresAuth: true}},
    {path: '/login',         component: Login,},
    {path: '/registrarse',   component: Register,},
    {path: '/perfil',        component: Profile, meta: {requiresAuth: true}},
    {path: '/usuario/:id/',        component: UserProfile, meta: {requiresAuth: true}},
    {path: '/usuario/:id/chat',        component: PrivateChat, meta: {requiresAuth: true}},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Proteger Rutas
let user = {
    id: null,
    email: null
}
subscribeToAuth(newUserData => {
    user = {
        ...newUserData,
    }
})
router.beforeEach((to,from)=>{
    if(user.id === null && to.meta.requiresAuth) {
        return {path: '/login'}
    }
})

export default router
