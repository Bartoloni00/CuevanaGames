<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { subscribeToAuth, logout } from "./services/auth.js";
import { useRouter } from "vue-router";

const {handleLogout} = useLogOut()
const {user} = useAuth()

function useLogOut(){
  const router = useRouter()
  const handleLogout = () => {
    logout();
        router.push({ path: "/login" });
  }

  return {
    handleLogout,
  }
}

function useAuth(){
  const user = ref({
  id: null,
  email: null,
  rol: null,
})

let authUnsubscribe

onMounted(() => {
    authUnsubscribe = subscribeToAuth((newUserData) => {
      user.value = {
        ...newUserData,
      }
    })
  })

onUnmounted(() => authUnsubscribe())

return {
  user,
}
}


</script>
<template>
  <header
    class="flex gap-8 p-4 items-center bg-black text-slate-300 justify-between py-6"
  >
    <span class="text-xl">Cuevana Games</span>
    <nav>
      <ul class="flex gap-4">
        <li class="hover:text-white"><router-link to="/">Home</router-link></li>
        <li class="hover:text-white">
          <router-link to="/tienda">Tienda</router-link>
        </li>
        <template v-if="user.id === null">
          <li class="hover:text-white">
            <router-link to="/login">Login</router-link>
          </li>
          <li class="hover:text-white">
            <router-link to="/registrarse">Registrarse</router-link>
          </li>
        </template>
        <template v-else>
          <li class="hover:text-white">
            <router-link to="/perfil">Mi perfil</router-link>
          </li>
          <template v-if="user.rol !== 'admin'">
            <li class="hover:text-white">
              <router-link to="/usuario/jsIMvySMeQfC0XzylbjqMJlJcX42/chat"
                >Contactar</router-link
              >
            </li>
          </template>
          <template v-if="user.rol === 'admin'">
            <li class="hover:text-white">
              <router-link to="/panel">panel</router-link>
            </li>
          </template>
          <li class="hover:text-white">
            <form action="#" @submit.prevent="handleLogout">
              <span class="m-1">({{ user.email }})</span>
              <button type="submit">Cerrar Sesión</button>
            </form>
          </li>
        </template>
      </ul>
    </nav>
  </header>
  <main class="container p-4 m-auto h-full">
    <router-view></router-view>
  </main>
  <footer class="bg-black text-slate-300 flex justify-center items-center">
    <p>
      Todos los derechos reservados &copy; 2023
      <a
        href="https://github.com/Bartoloni00"
        class="hover:text-white"
        target="_blank"
        >Bartoloni Abraham</a
      >
      |
      <a
        href="https://github.com/ezearevalodev"
        class="hover:text-white"
        target="_blank"
        >Ezequiel Arevalo</a
      >
    </p>
  </footer>
</template>
