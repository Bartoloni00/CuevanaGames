<script setup>
import PrincipalTitle from "@/components/PrincipalTitle.vue";
import LoadingContext from "@/components/LoadingContext.vue";
import LinkButton from "@/components/LinkButton.vue";

import { useAuth } from "@/composition/useAuth.js";
import { useGames } from "@/composition/useGames.js";
import { useChats } from "@/composition/useChats.js";

const {user} = useAuth() // esta linea es importante
const {loadingChats, chats} = useChats()
const {loadingGames, games} = useGames()
</script>
<template>
  <div class="mx-auto mt-8">
    <PrincipalTitle class="text-center">Dashboard</PrincipalTitle>

    <!-- Sección de agregar juego -->
    <router-link
      to="/panel/agregar-juego"
      class="text-green-500 hover:underline border border-green-500 rounded-lg p-1 mx-auto flex gap-1 max-w-[150px]"
      >
      <img src="/icons/add.svg" alt="icono agregar">
      Agregar Juego
      </router-link
    >

    <div class="flex mt-4 flex-wrap justify-center gap-4">
      <!-- Columna de Games -->
      <section class="border border-slate-200 rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-2 text-center">Games</h2>

        <LoadingContext :loading="loadingGames">
          <table class="min-w-full table-auto mb-4">
            <thead>
              <tr>
                <th class="py-2">ID</th>
                <th class="py-2">Title</th>
                <th class="py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="game in games" :key="game.id">
                <td class="border px-4 py-2">{{ game.id }}</td>
                <td class="border px-4 py-2">{{ game.title }}</td>
                <td class="border px-4 py-2">
                  <router-link
                    :to="`/panel/editar-juego/${game.id}`"
                    class="text-blue-500 hover:underline mr-2 border flex gap-1 border-blue-500 rounded-lg p-1 my-2 text-center w-[140px]"
                    >
                      <img src="/icons/edit.svg" alt="icono editar">
                      Editar
                    </router-link
                  >
                  <router-link
                    :to="`/panel/eliminar-juego/${game.id}`"
                    class="text-red-500 flex gap-1 hover:underline border border-red-500 rounded-lg p-1 my-2 text-center w-[140px]"
                    >
                      <img src="/icons/delete.svg" alt="icono eliminar">  
                      Eliminar
                    </router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </LoadingContext>
      </section>

      <!-- Columna de Chats -->
      <section class="border border-slate-200 rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-2 text-center">Chats</h2>

        <LoadingContext :loading="loadingChats">
            <table class="min-w-full table-auto mb-4">
              <thead>
                <tr>
                  <th class="py-2">Usuario</th>
                  <th class="py-2">Chat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="chat in chats" :key="chat.id">
                  <td class="border px-8 py-2">
                    <router-link
                      :to="`/usuario/${chat.id}`"
                      class="text-blue-600"
                      >{{ chat.email }}</router-link
                    >
                  </td>
                  <td class="border px-8 py-2">
                    <LinkButton
                    :url="`/usuario/${chat.id}/chat`"
                    color="yellow"
                    >
                    Ir al chat
                    </LinkButton>
                  </td>
                </tr>
              </tbody>
            </table>
        </LoadingContext >
      </section>
    </div>
  </div>
</template>
