<script setup>
import PrincipalTitle from "../components/PrincipalTitle.vue";
import LinkButton from "../components/LinkButton.vue";
import { useGames } from "../composition/useGames";
import Loadingcontext from "../components/loadingcontext.vue";
import PhotoDefault from "../components/PhotoDefault.vue";

const {loadingGames, games} = useGames()
</script>
<template>
  <div>
    <PrincipalTitle>Compra los mejores juegos en CuevanaGames</PrincipalTitle>
    <Loadingcontext :loading="loadingGames">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="game in games"
          :key="game.id"
          class="bg-white p-4 rounded shadow-lg hover:shadow-xl"
        >
          <PhotoDefault 
            :element="game"
          />
          <h2 class="text-xl font-semibold mb-2">{{ game.title }}</h2>
          <p class="text-gray-600 mb-4">{{ game.description }}</p>
          <div class="text-lg font-bold text-blue-500 my-2">
            Precio: ${{ game.price }}
          </div>
          <LinkButton
          :url="`/tienda/${game.id}`"
          >
          Ver detalles
          </LinkButton>
        </div>
      </div>
    </Loadingcontext>
  </div>
</template>
