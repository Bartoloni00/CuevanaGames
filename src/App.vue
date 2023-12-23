<script setup>
import { useRouter } from "vue-router";

import {logout } from "./services/auth.js";
import { useAuth } from "./composition/useAuth";
import { ref, provide, readonly } from "vue";

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

const notification = ref({
  message:null,
  type: 'success',
})

function setNotifications(data) {
  notification.value = {...data}
  setTimeout(() => {
    clearNotification()
  }, 10000)
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
            <form action="#" @submit.prevent="handleLogout" class="flex mx-1">
              
              <button type="submit" class="flex items-center">
                Cerrar Sesión
                <img v-if="user.photoURL" :src="user.photoURL" alt="" class="w-10 rounded-full m-1">
                <span v-else class="m-1">({{ user.email }})</span> 
              </button>
            </form>
          </li>
        </template>
      </ul>
    </nav>
  </header>
  <main class="container p-4 m-auto h-full bg-slate-50">
    <div v-if="notification.message && notification.type == 'success'" class="bg-green-200 p-2 mb-2 m-auto text-center capitalize rounded border">
      {{ notification.message }}
    </div>
    <div v-else-if="notification.message && notification.type == 'error'" class="bg-red-200 p-2 mb-2 m-auto text-center capitalize rounded border">
      {{ notification.message }}
    </div>
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
