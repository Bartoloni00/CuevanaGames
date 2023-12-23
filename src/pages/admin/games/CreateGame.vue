<script setup>
import BaseButton from '../../../components/BaseButton.vue'
import BaseLabel from '../../../components/BaseLabel.vue'
import BaseInput from '../../../components/BaseInput.vue'
import PrincipalTitle from '../../../components/PrincipalTitle.vue'
import { createGame } from '../../../services/games.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '../../../composition/useAuth'

const {user} = useAuth()
const {
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
            newGame.value = {
                title: '',
                description: '',
                price: null,
            };
            processingForm.value = false; // Asegúrate de restablecer el estado después de la llamada exitosa
            router.push({ path: `/panel/editar-juego/${gameId}` });
        })
        .catch((error) => {
            console.error('Error al agregar el juego:', error);
            processingForm.value = false; // Asegúrate de restablecer el estado en caso de error
        });
}

return {
    handleCreateGame,
    processingForm,
    newGame,
}
}
</script>

<template>
    <PrincipalTitle>Agregar Juego</PrincipalTitle>
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
        <BaseButton :loading="processingForm" color="green">Agregar juego</BaseButton>
    </form>
</template>