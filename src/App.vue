<script setup>
import { useRouter } from "vue-router";

import {logout } from "./services/auth.js";
import { useAuth } from "./composition/useAuth";
import { ref, provide, readonly } from "vue";
import NotificationMessage from "./components/NotificationMessage.vue";

const {handleLogout} = useLogOut()
const {user} = useAuth()

function useLogOut(){
  const router = useRouter()
  const handleLogout = () => {
    logout()
      .then(()=>{
        setNotifications({
          message: 'Sesion cerrada exitosamente',
          type: 'success',
        })
      router.push({ path: "/login" });
      })
      .catch(()=>{
        setNotifications({
          message: 'Ocurrio un error al cerrar la sesion',
          type: 'error',
        })
      })
    
  }

  return {
    handleLogout,
  }
}

const notification = ref({
  message:null,
  type: 'success',
})

function setNotifications(data, time = 10000) {
  notification.value = {...data}
  setTimeout(() => {
    handleCloseNotification()
  }, time)
}

function handleCloseNotification(){
  clearNotification()
}

function clearNotification(){
  notification.value = {
  message:null,
  type: 'success',
}
}

// definimos el proveedor del servicio de notificacion
provide('notification',{
  notification: readonly(notification),// solo lectura
  setNotifications,
})
</script>
<template>
  <header
    class="flex gap-8 p-4 items-center bg-black text-slate-300 justify-between py-6"
  >
    <span class="text-xl">Cuevana Games</span>
    <nav>
      <ul class="flex gap-4 items-center">
        <li class="hover:text-white">
          <router-link to="/" class="flex gap-1">
            <img src="/icons/home_white.svg" alt="icono para ir a inicio"/>
            Inicio
          </router-link>
        </li>
        <li class="hover:text-white">
          <router-link to="/tienda" class="flex gap-1">
            <img src="/icons/store_white.svg" alt="icono para ir a la tienda"/>
            Tienda
          </router-link>
        </li>
        <template v-if="user.id === null">
          <li class="hover:text-white">
            <router-link  class="flex gap-1" to="/login">
              <img src="/icons/login_white.svg" alt="icono para ir a iniciar sesion"/>
              Login
            </router-link>
          </li>
          <li class="hover:text-white">
            <router-link  class="flex gap-1" to="/registrarse">
              <img src="/icons/register_white.svg" alt="icono para ir a registrarse"/>
              Registrarse
            </router-link>
          </li>
        </template>
        <template v-else>
          <template v-if="user.rol !== 'admin'">
            <li class="hover:text-white">
              <router-link  class="flex gap-1" to="/usuario/jsIMvySMeQfC0XzylbjqMJlJcX42/chat">
                <img src="/icons/chat_white.svg" alt="icono para contactarse con el administrador"/>
                Contactar
              </router-link
              >
            </li>
          </template>
          <template v-if="user.rol === 'admin'">
            <li class="hover:text-white">
              <router-link  class="flex gap-1" to="/panel">
                <img src="/icons/dashboard_white.svg" alt="icono para ir al panel de administrador"/>
                panel
              </router-link>
            </li>
          </template>
          <li class="hover:text-white">
            <form action="#" @submit.prevent="handleLogout">
              <button type="submit" class="flex items-center">
                <img src="/icons/logout_white.svg" alt="icono para cerrar sesion"/>
                Cerrar Sesión
              </button>
            </form>
          </li>
          <li v-if="user.id !== null" class="hover:text-white">
                <router-link  class="flex gap-1" to="/perfil">
                  <img v-if="user.photoURL" :src="user.photoURL" alt="" class="w-10 rounded-full m-1">
                  <span v-else class="m-1">({{ user.email }})</span> 
                </router-link>
              </li>
        </template>
      </ul>
    </nav>
  </header>
  <main class="container p-4 m-auto h-full bg-slate-50">
    <NotificationMessage
      v-if="notification.message"
      :notification="notification"
      @close="handleCloseNotification"
    />
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
