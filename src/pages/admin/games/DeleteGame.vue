<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import BaseButton from '../../../components/BaseButton.vue';
import BaseLoader from '../../../components/BaseLoader.vue';
import PrincipalTitle from '../../../components/PrincipalTitle.vue';
import { subscribeToAuth } from '../../../services/auth.js';
import { getGameById, deleteGameById } from '../../../services/games.js';
import { useRoute,useRouter } from 'vue-router';

const {
    loadingGame,
    user,
    game,
    deleteGame,
} = useDeleteGame()

function useDeleteGame () {
    const route = useRoute() // obtener los parametros
const router = useRouter() // redireccionar
const loadingGame = ref(true)
const user = ref({
    id:null,
    email:null,
    rol:null
})
const game = ref({
    id: null,
    title: null,
    description: null,
    price: null
})
let authUnsubscribe

const deleteGame = () => {
    deleteGameById(route.params.id)
                .then(
                    router.push({path: '/panel'})
                )
}
onMounted(async ()=>{
    authUnsubscribe = subscribeToAuth(newUser => {
            user.value = newUser
            })
            loadingGame.value = true
            game.value = await getGameById(route.params.id)
            loadingGame.value = false
})
onUnmounted(()=>authUnsubscribe())

return {
    loadingGame,
    user,
    game,
    deleteGame,
}
}
</script>
<template>
    <PrincipalTitle>¿Esta seguro de querer eliminar el juego: <b>{{ loadingGame ?'...cargando juego': game.title}}</b>?</PrincipalTitle>
    <template v-if="!loadingGame">
            <div class="bg-white p-8 rounded shadow-md">
                <h2 class="text-3xl font-semibold mb-4">{{ game.title }}</h2>
                <p class="text-gray-600 mb-6">{{ game.description }}</p>
                <div class="text-lg font-bold text-blue-500 mb-4">Precio: ${{ game.price }}</div>

                <form action="#" @submit.prevent="deleteGame">
                    <BaseButton color="red">Eliminar {{ game.title }}</BaseButton>
                </form>
            </div>
        </template>
    <template v-else>
        <BaseLoader/>
    </template>
</template>