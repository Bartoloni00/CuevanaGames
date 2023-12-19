<script setup>
import BaseButton from '../../../components/BaseButton.vue';
import BaseLabel from '../../../components/BaseLabel.vue'
import BaseInput from '../../../components/BaseInput.vue'
import PrincipalTitle from '../../../components/PrincipalTitle.vue';
import { getGameById, updateGameById } from '../../../services/games.js'
import { onMounted, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';

import { useAuth } from '../../../composition/useAuth';
const {user} = useAuth()
const {
    gameName,
        processingFormEdit,
        game,
        loadingGame,
        handleEditGame,
    } = useEditGame()

function useEditGame () {
    const router = useRouter()
    const route = useRoute()

    const loadingGame = ref(true)
    const processingFormEdit = ref(false)
    const game = ref({
                    title: null,
                    description: null,
                    id: null,
                    price: null,
                })
    const gameName = ref('') 

    const handleEditGame = async () => {
        if(processingFormEdit.value) return;

        processingFormEdit.value = true;

        const updatedGameData = {
            title: game.value.title,
            description: game.value.description,
            price: game.value.price,
        };

        try {
            await updateGameById(game.value.id, updatedGameData);
            router.push({ path: '/panel' });
        } catch (error) {
            console.error('Error al editar el juego:', error);
        } finally {
            processingFormEdit.value = false;
        }
    }

    onMounted(async () => {
            loadingGame.value = true
            game.value = await getGameById(route.params.id)
            gameName.value = game.value.title
            loadingGame.value = false
    })

    return {
        gameName,
        processingFormEdit,
        game,
        loadingGame,
        handleEditGame,
    }
}
</script>

<template>
    <PrincipalTitle>Editando el juego: <b>{{ loadingGame ?'...cargando juego': gameName }}</b></PrincipalTitle>
    <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleEditGame">
        <div>
            <BaseLabel for="title">Titulo</BaseLabel>
            <BaseInput 
                type="text"
                id="title"
                v-model="game.title"
            />
        </div>
        <div>
            <BaseLabel for="description">Descripcion</BaseLabel>
            <textarea 
                class="border border-yellow-900 w-full"
                id="description"
                name="description"
                v-model="game.description"
            ></textarea>
        </div>
        <div>
            <BaseLabel for="price">Precio</BaseLabel>
            <BaseInput
                type="number"
                id="price"
                v-model="game.price"
            />
        </div>
        <BaseButton :loading="processingFormEdit" color="yellow">Editar juego: {{ gameName }}</BaseButton>
    </form>
</template>
