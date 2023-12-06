<script>
import { subscribeToAuth, logout } from './services/auth.js';
export default {
    name: 'App',
    data() {
        return {
            user:{
                id: null,
                email: null,
                rol: null,
            }
        }
    },
    methods: {
        handleLogout(){
            logout()
            this.$router.push({path: '/login'})
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.user = {
                ...newUserData,
            }
        })
    }
    
}
</script>
<template>
    <header class="flex gap-8 p-4 items-center bg-yellow-900 justify-between py-6">
        <span class="text-xl">CuevanaGames</span>
        <nav>
            <ul class="flex gap-4">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/tienda">Tienda</router-link></li>
        <template v-if="user.id === null">
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/registrarse">Registrarse</router-link></li>
        </template>
        <template v-else>
            <!-- <li><router-link to="/chat">Chat</router-link></li> -->
            <li><router-link to="/perfil">Mi perfil</router-link></li>
            <template v-if="user.rol !== 'admin'">
                <li><router-link to="/usuario/jsIMvySMeQfC0XzylbjqMJlJcX42/chat">Contactar</router-link></li>
            </template>
            <template v-if="user.rol === 'admin'">
                <li><router-link to="/panel">panel</router-link></li>
            </template>
            <li>
                <form action="" @submit.prevent="handleLogout">
                    <span class="m-1">{{ user.email }} </span>
                    <button type="submit"> cerrar session</button>
                </form>
            </li>
        </template>
            </ul>
        </nav>
    </header>
    <main class="container p-4 m-auto h-full">
        <router-view></router-view>
    </main>
    <footer class="bg-yellow-900 flex justify-center items-center">
        <p>Bartoloni Abraham</p>
    </footer>
</template>