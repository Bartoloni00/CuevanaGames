<script setup>
import { onMounted, inject, ref } from 'vue';
import BaseButton from '../../../components/BaseButton.vue';
import LoadingContext from '../../../components/LoadingContext.vue';
import PrincipalTitle from '../../../components/PrincipalTitle.vue';
import { getGameById, deleteGameById } from '../../../services/games.js';
import { useRoute,useRouter } from 'vue-router';

import { useAuth } from '../../../composition/useAuth';
import GameDetails from '../../../components/GameDetails.vue';

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

const {user} = useAuth()
const {
    feedback,
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

    const feedback = ref({
        message: null,
        type: 'success'
    })
    const deleteGame = () => {
        deleteGameById(route.params.id)
            .then(()=>{
                setNotifications({
                    message: `${game.value.title} fue eliminado exitosamente`,
                    type: 'success',
                })
                router.push({path: '/panel'})
                }
            )
            .catch(error => {
                feedback.value = {
                    message: error,
                    type: 'error',
                };
            })
    }
    onMounted(async ()=>{
                loadingGame.value = true
                game.value = await getGameById(route.params.id)
                loadingGame.value = false
    })

    return {
        feedback,
        loadingGame,
        game,
        deleteGame,
    }
}
</script>
<template>
    <PrincipalTitle class="text-center mt-[5vh]">¿Esta seguro de querer eliminar el juego: <b>{{ loadingGame ?'...cargando juego': game.title}}</b>?</PrincipalTitle>
    <LoadingContext :loading="loadingGame">
    <GameDetails 
        :game="game"
        :add-to-car="false"
    />
    <form action="#" @submit.prevent="deleteGame" class="mt-2">
        <span v-if="feedback.message" class="text-red-600 text-center py-2">
            {{ feedback.message }}
        </span>
        <BaseButton color="red">Eliminar {{ game.title }}</BaseButton>
    </form>
    </LoadingContext>
</template>