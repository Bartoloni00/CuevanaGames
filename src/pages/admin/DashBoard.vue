<script setup>
import { subscribeToAuth } from "../../services/auth.js";
import { getAllGames } from "../../services/games.js";
import { getAllUsers } from "../../services/user.js";

import PrincipalTitle from "../../components/PrincipalTitle.vue";
import BaseLoader from "../../components/BaseLoader.vue";
import { onMounted, onUnmounted, ref } from "vue";

const {user} = useUser() // esta linea es importante
const {loadingChats, chats} = useChats()
const {loadingGames, games} = useGames()


function useUser () {
  const user = ref({
  id: null,
  email: null,
  rol: null,
})
let  authUnsubscribe;

onMounted(async()=>{
  authUnsubscribe = subscribeToAuth((newUser) => {
      user.value = newUser;
    });
})
onUnmounted(() => authUnsubscribe())
return {
  user,
}
}

function useChats () {
  const loadingChats = ref(false)
  const chats = ref([])

  onMounted(async()=>{
    loadingChats.value = true;
    getAllUsers().then((allChats) => {
      chats.value = allChats;
      loadingChats.value = false;
    });
  })

  return {
    loadingChats,
    chats,
  }
}

function useGames () {
const loadingGames = ref(true)
const games = ref([])

onMounted(async () => {
    loadingGames.value = true;
    getAllGames().then((allGames) => {
      games.value = allGames;
      loadingGames.value = false;
    });
    
})

return {
  loadingGames,
  games
}
}

</script>

<template>
  <div class="mx-auto mt-8">
    <PrincipalTitle>Dashboard</PrincipalTitle>

    <!-- Sección de agregar juego -->
    <router-link
      to="/panel/agregar-juego"
      class="text-green-500 hover:underline border border-green-500 rounded-lg p-1"
      >Agregar Juego</router-link
    >

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
                  <router-link
                    :to="`/panel/editar-juego/${game.id}`"
                    class="text-blue-500 hover:underline mr-2 border border-blue-500 rounded-lg p-1 block w-full my-2 text-center"
                    >Editar</router-link
                  >
                  <router-link
                    :to="`/panel/eliminar-juego/${game.id}`"
                    class="text-red-500 hover:underline border border-red-500 rounded-lg p-1 block w-full my-2 text-center"
                    >Eliminar</router-link
                  >
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
              <router-link
                :to="`/usuario/${chat.id}/chat`"
                class="text-blue-600"
                >{{ chat.email }}</router-link
              >
            </div>
          </div>
        </template>

        <template v-else>
          <BaseLoader />
        </template>
      </div>
    </div>
  </div>
</template>
