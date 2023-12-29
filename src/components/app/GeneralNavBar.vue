<script setup>
import { useAuth } from "@/composition/useAuth";
import { useRouter } from "vue-router";
import {logout } from "@/services/auth.js";
import {inject} from 'vue'

const {user} = useAuth()
const {handleLogout} = useLogOut()

const {setNotifications} = inject('notification')

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
</script>
<template>
      <header
    class="flex gap-8 items-center bg-black text-slate-300 justify-between px-8"
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
            <li class="hover:text-white">
              <router-link  class="flex gap-1" to="/carrito">
                <img src="/icons/shopping_cart_white.svg" alt="icono de un carrito de compras"/>
                Carrito
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
</template>