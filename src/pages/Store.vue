<script setup>
import PrincipalTitle from "../components/PrincipalTitle.vue";
import LinkButton from "../components/LinkButton.vue";
import { useGames } from "../composition/useGames";
import Loadingcontext from "../components/loadingcontext.vue";
import PhotoDefault from "../components/PhotoDefault.vue";

const {loadingGames, games} = useGames()
</script>
<template>
    <PrincipalTitle class="text-center my-[7vh]">Compra los mejores juegos en CuevanaGames</PrincipalTitle>
    <Loadingcontext :loading="loadingGames">
      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <article
          v-for="game in games"
          :key="game.id"
          class="bg-slate-100 flex flex-col  rounded shadow-lg hover:shadow-xl hover:bg-slate-200 transition-all duration-300"
        >
              <PhotoDefault 
              :element="game"
              class="max-h-[200px] object-cover"
            />
            <h2 class="text-xl text-center font-semibold my-2">{{ game.title }}</h2>
            <p class="text-gray-600 pb-4 text-center">{{ game.description }}</p>
            <!-- <span class="text-xl text-center font-bold text-green-800 my-2">
              ${{ game.price }}
            </span> -->
            <LinkButton
            :url="`/tienda/${game.id}`"
            class="mb-4 mx-auto"
            >
              Ver detalles
            </LinkButton>
        </article>
      </section>
    </Loadingcontext>
</template>
