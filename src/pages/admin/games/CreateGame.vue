<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseInput from '@/components/BaseInput.vue'
import PrincipalTitle from '@/components/PrincipalTitle.vue'
import { createGame } from '@/services/games.js'
import { ref,inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composition/useAuth'

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

const {user} = useAuth()
const {
    feedback,
    handleCreateGame,
    processingForm,
    newGame,
} = useCreateGame()

function useCreateGame () {
    const router = useRouter()

const processingForm = ref(false)
const newGame = ref({
                title: '',
                description: '',
                price: null,
            })
const feedback = ref({
        message: null,
        type:'success',
    })
const handleCreateGame = () => {
    if (processingForm.value) return;

    processingForm.value = true;

    const gameData = {
        title: newGame.value.title,
        description: newGame.value.description,
        price: newGame.value.price,
    };

    createGame(gameData)
        .then(gameId => {
            setNotifications({
                message: `El juego: ${newGame.value.title} fue agregado exitosamente`,
                type: 'success',
            })
            newGame.value = {
                title: '',
                description: '',
                price: null,
            };
            processingForm.value = false;

            router.push({ path: `/panel/editar-juego/${gameId}` });
        })
        .catch((error) => {
            feedback.value = {
                message: error,
                type: 'error',
            }
            processingForm.value = false;
        });
}

return {
    handleCreateGame,
    processingForm,
    newGame,
    feedback,
}
}
</script>

<template>
    <PrincipalTitle class="text-center mt-[5vh]">Agregar Juego</PrincipalTitle>
    <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleCreateGame">
        <div>
            <BaseLabel for="title">Titulo</BaseLabel>
            <BaseInput 
                type="text"
                id="title"
                v-model="newGame.title"
            />
        </div>
        <div>
            <BaseLabel for="description">Descripcion</BaseLabel>
            <textarea 
                    class="border border-yellow-900 w-full"
                    id="description"
                    name="description"
                    v-model="newGame.description"></textarea>
        </div>
        <div>
            <BaseLabel for="price">Precio</BaseLabel>
            <BaseInput
                type="number"
                id="price"
                v-model="newGame.price"
            />
        </div>
        <span v-if="feedback.message" class="text-red-600 text-center py-2">
            {{ feedback.message }}
        </span>
        <BaseButton :loading="processingForm" color="green">Agregar juego</BaseButton>
    </form>
</template>