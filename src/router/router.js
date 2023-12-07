import { createRouter, createWebHashHistory } from 'vue-router'
import { subscribeToAuth } from '../services/auth.js'

import Home from '../pages/Home.vue'
import Store from '../pages/Store.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import MyProfile from '../pages/MyProfile.vue'
import UserProfile from '../pages/UserProfile.vue'
import PrivateChat from '../pages/PrivateChat.vue'
import DashBoard from '../pages/DashBoard.vue'
import CreateGame from '../pages/CreateGame.vue'
import GameDetails from '../pages/GameDetails.vue'
import DeleteGame from '../pages/DeleteGame.vue'

const routes = [
    {path: '/', component: Home,},
    {path: '/tienda', component: Store,},
    {path: '/tienda/:id/', component: GameDetails,},
    {path: '/login', component: Login,},
    {path: '/registrarse', component: Register,},
    {path: '/perfil', component: MyProfile, meta: {requiresAuth: true}},
    {path: '/usuario/:id/', component: UserProfile, meta: {requiresAuth: true}},
    {path: '/usuario/:id/chat', component: PrivateChat, meta: {requiresAuth: true}},
    {path: '/panel', component: DashBoard, meta: {requiresAuth: true}},
    {path: '/panel/eliminar-juego/:id', component: DeleteGame, meta: {requiresAuth: true}},
    {path: '/panel/agregar-juego', component: CreateGame, meta: {requiresAuth: true}},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// Proteger Rutas
let user = {
    id: null,
    email: null,
    rol: null
}

subscribeToAuth(newUserData => {
    user = {
        ...newUserData,
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !user.id) {
        next('/login');
    } else if ((to.path === '/panel' || to.path === '/panel/agregar-juego')  && user.rol !== 'admin') {
        next('/login');
    } else {
        next();
    }
});


export default router

