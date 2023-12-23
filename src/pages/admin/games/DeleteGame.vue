<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import BaseButton from '../../../components/BaseButton.vue';
import LoadingContext from '../../../components/LoadingContext.vue';
import PrincipalTitle from '../../../components/PrincipalTitle.vue';
import { getGameById, deleteGameById } from '../../../services/games.js';
import { useRoute,useRouter } from 'vue-router';

import { useAuth } from '../../../composition/useAuth';
import GameDetails from '../../../components/GameDetails.vue';

const {user} = useAuth()
const {
    loadingGame,
    game,
    deleteGame,
} = useDeleteGame()

function useDeleteGame () {
    const route = useRoute() // obtener los parametros
const router = useRouter() // redireccionar
const loadingGame = ref(true)

const game = ref({
    id: null,
    title: null,
    description: null,
    price: null
})

const deleteGame = () => {
    deleteGameById(route.params.id)
                .then(
                    router.push({path: '/panel'})
                )
}
onMounted(async ()=>{
            loadingGame.value = true
            game.value = await getGameById(route.params.id)
            loadingGame.value = false
})

return {
    loadingGame,
    game,
    deleteGame,
}
}
</script>
<template>
    <PrincipalTitle>¿Esta seguro de querer eliminar el juego: <b>{{ loadingGame ?'...cargando juego': game.title}}</b>?</PrincipalTitle>
    <LoadingContext :loading="loadingGame">
    <GameDetails 
        :game="game"
        :add-to-car="false"
    />
    <form action="#" @submit.prevent="deleteGame" class="mt-2">
        <BaseButton color="red">Eliminar {{ game.title }}</BaseButton>
    </form>
    </LoadingContext>
</template>