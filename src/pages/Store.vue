<script>
  import PrincipalTitle from '../components/PrincipalTitle.vue';
  import BaseLoader from '../components/BaseLoader.vue';
  import { getAllGames } from '../services/games.js';
  
  export default {
    name: 'Store',
    components: { PrincipalTitle, BaseLoader },
    data() {
      return {
        loadingGames: true,
        games: [],
      };
    },
    mounted() {
      this.loadingGames = true;
      getAllGames()
        .then((allGames) => {
          this.games = allGames;
          this.loadingGames = false;
        })
        .catch((error) => {
          console.error('Error fetching games:', error);
          this.loadingGames = false;
        });
    },
  };
</script>
<template>
    <div>
      <PrincipalTitle>Compra los mejores juegos en CuevanaGames</PrincipalTitle>
      <template v-if="loadingGames">
        <BaseLoader />
      </template>
      <template v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="game in games" :key="game.id" class="bg-white p-4 rounded shadow">
            <router-link to="`/tienda/${game.id}`">
                <h2 class="text-xl font-semibold mb-2">{{ game.title }}</h2>
                <p class="text-gray-600 mb-4">{{ game.description }}</p>
                <div class="text-lg font-bold text-blue-500">Precio: ${{ game.price }}</div>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </template>