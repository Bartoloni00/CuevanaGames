<script setup>
import { useAuth } from "@/composition/useAuth";
import { useRouter } from "vue-router";
import { logout } from "@/services/auth.js";
import { inject } from 'vue'

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
  <header class="bg-[#1A1A1A]">
    <nav class="relative flex flex-wrap items-center justify-between px-2 py-4">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a class="text-sm font-bold leading-relaxed inline-block whitespace-nowrap uppercase text-white" href="#">
            Cuevana Games
          </a>
          <button class="text-white cursor-pointer text-xl leading-none border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
              <img src="/icons/btn-menu.svg" alt="icono para ir a inicio"/>
          </button>
        </div>
        <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
          <ul class="flex flex-col lg:flex-row items-start lg:items-center list-none ml-auto">
            <li class="text-white py-2 mx-1 min-w-[100px]">
              <router-link to="/" class="flex items-center gap-1">
                <img src="/icons/home_white.svg" alt="icono para ir a inicio"/>
                Inicio
              </router-link>
            </li>
            <li class="text-white py-2 mx-1 min-w-[100px]">
              <router-link to="/tienda" class="flex items-center gap-1">
                <img src="/icons/store_white.svg" alt="icono para ir a la tienda"/>
                Tienda
              </router-link>
            </li>
            <template v-if="user.id === null">
              <li class="text-white py-2 mx-1 min-w-[100px]">
                <router-link class="flex items-center gap-1" to="/login">
                  <img src="/icons/login_white.svg" alt="icono para ir a iniciar sesion"/>
                  Login
                </router-link>
              </li>
              <li class="text-white py-2 mx-1 min-w-[100px]">
                <router-link class="flex items-center gap-1" to="/registrarse">
                  <img src="/icons/register_white.svg" alt="icono para ir a registrarse"/>
                  Registrarse
                </router-link>
              </li>
            </template>
            <template v-else>
              <template v-if="user.rol !== 'admin'">
                <li class="text-white py-2 mx-1 min-w-[100px]">
                  <router-link class="flex items-center gap-1" to="/usuario/jsIMvySMeQfC0XzylbjqMJlJcX42/chat">
                    <img src="/icons/chat_white.svg" alt="icono para contactarse con el administrador"/>
                    Contactar
                  </router-link
                  >
                </li>
                <li class="text-white py-2 mx-1 min-w-[100px]">
                  <router-link class="flex items-center gap-1" to="/carrito">
                    <img src="/icons/shopping_cart_white.svg" alt="icono de un carrito de compras"/>
                    Carrito
                  </router-link
                  >
                </li>
              </template>
              <template v-if="user.rol === 'admin'">
                <li class="text-white py-2 mx-1 min-w-[100px]">
                  <router-link  class="flex items-center gap-1" to="/panel">
                    <img src="/icons/dashboard_white.svg" alt="icono para ir al panel de administrador"/>
                    panel
                  </router-link>
                </li>
              </template>
              <li class="text-white py-2 mx-1 min-w-[100px]">
                <form action="#" @submit.prevent="handleLogout">
                  <button type="submit" class="flex items-center gap-1">
                    <img src="/icons/logout_white.svg" alt="icono para cerrar sesion"/>
                    Cerrar Sesión
                  </button>
                </form>
              </li>
              <li v-if="user.id !== null" class="text-white py-2 mx-1 min-w-[100px]">
                <router-link  class="flex items-center" to="/perfil">
                  <img v-if="user.photoURL" :src="user.photoURL" alt="" class="w-10 rounded-full m-1">
                  <span v-else class="m-1">({{ user.email }})</span> 
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "blueGray-navbar",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
    }
  }
}
</script>