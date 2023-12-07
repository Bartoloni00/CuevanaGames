<script>
import { getPrivateChatsForUser } from '../services/chat.js'
import { subscribeToAuth } from '../services/auth.js'
import { getAllGames } from '../services/games.js';

import PrincipalTitle from '../components/PrincipalTitle.vue'
import BaseLoader from '../components/BaseLoader.vue'

export default {
    name: 'DashBoard',
    data() {
        return {
            loadingChats: true,
            loadingGames: true,
            chats: [],
            games: [],
            user: {
                id: null,
                email: null,
                rol: null,
            },
            authUnsubscribe: () => {},
            chatsUnsubscribe: () => {},
        };
    },
    async mounted() {
        this.loadingChats = true;
        this.chatsUnsubscribe = getPrivateChatsForUser(this.user.id, chats => {
            console.log(chats);
            this.chats = chats;
            this.loadingChats = false;
        });
        this.authUnsubscribe = subscribeToAuth(newUser => {
            this.user = newUser;
        });
        this.loadingGames = true;
        getAllGames()
            .then((allGames) => {
            this.games = allGames;
            this.loadingGames = false;
        })
    },
    unmounted() {
        this.authUnsubscribe();
    },
    components: { PrincipalTitle,BaseLoader }
}
</script>

<template>
    <div class="mx-auto mt-8">
      <PrincipalTitle>Dashboard</PrincipalTitle>
  
      <!-- Sección de agregar juego -->
      <router-link to="/panel/agregar-juego" class="text-blue-500">Agregar Juego</router-link>
  
      <div class="flex mt-4">
        <!-- Columna de Games -->
        <div class="w-1/2 pr-4">
          <h2 class="text-xl font-semibold mb-2">Games</h2>
  
          <template v-if="!loadingGames">
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
                    <!-- <router-link :to="`/panel/editar-juego/${game.id}`" class="text-blue-500 hover:underline mr-2 border border-blue-500 rounded-lg p-1">Editar</router-link> -->
                    <router-link :to="`/panel/eliminar-juego/${game.id}`" class="text-red-500 hover:underline border border-red-500 rounded-lg p-1">Eliminar</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
  
          <template v-else>
            <BaseLoader />
          </template>
        </div>
  
        <!-- Columna de Chats -->
        <div class="w-1/2 pl-4">
          <h2 class="text-xl font-semibold mb-2">Chats</h2>
  
          <template v-if="!loadingChats">
            <div v-for="chat in chats" :key="chat.id" class="mb-4">
              <div>
                <b>Usuario: </b>
                <router-link :to="`/usuario/${chat.userId}`" class="text-blue-600">{{ chat.user }}</router-link>
              </div>
              <div><b>Mensaje:</b> {{ chat.chat }}</div>
              <div class="text-right">{{ dateToString(chat.created_at) }}</div>
            </div>
          </template>
  
          <template v-else>
            <BaseLoader />
          </template>
        </div>
      </div>
    </div>
  </template>
  