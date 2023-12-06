<script>
import PrincipalTitle from '../components/PrincipalTitle.vue';
import {getGameById} from '../services/games.js'

    export default {
    name: 'GameDetails',
    components: { PrincipalTitle },
    data(){
        return {
            loadingGame: true,
            game: {
                id: null,
                title: null,
                description: null,
                price: null
            }
        }
    },
    async mounted(){
        this.loadingGame = true
        this.game = await getGameById(this.$route.params.id)
        this.loadingGame = false
    }
}
</script>
<template>
    <PrincipalTitle>DETALLES DEL JUEGO</PrincipalTitle>
    <template v-if="!loadingGame">
            <div class="bg-white p-8 rounded shadow-md">
                <h2 class="text-3xl font-semibold mb-4">{{ game.title }}</h2>
                <p class="text-gray-600 mb-6">{{ game.description }}</p>
                <div class="text-lg font-bold text-blue-500 mb-4">Precio: ${{ game.price }}</div>

                <div class="flex items-center">
                    <button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Agregar al carrito</button>
                </div>
            </div>
        </template>
    <template></template>
</template>