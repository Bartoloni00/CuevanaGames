<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseLabel from '@/components/BaseLabel.vue'
import BaseInput from '@/components/BaseInput.vue'
import PrincipalTitle from '@/components/PrincipalTitle.vue';
import { getGameById, updateGameById } from '@/services/games.js'
import { onMounted, ref, inject } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useAuth } from '@/composition/useAuth';

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

const {user} = useAuth()
const {
    gameName,
        processingFormEdit,
        game,
        feedback,
        loadingGame,
        handleEditGame,
        handleFrontPageChange,
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
                    file: null,
                    preview: null,
                })
    const gameName = ref('') 

    const feedback = ref({
        message: null,
        type: 'success'
    })
    const handleEditGame = async () => {
        if(processingFormEdit.value) return;

        processingFormEdit.value = true;

        const updatedGameData = {
            title: game.value.title,
            description: game.value.description,
            price: game.value.price,
            file: game.value.file,
        };

        try {
            await updateGameById(game.value.id, updatedGameData);
            setNotifications({
                message: `El juego: ${game.value.title} fue editado correctamente`,
                type: 'success'
            })
            router.push({ path: '/panel' });
            
        } catch (error) {
            feedback.value = {
                message: error,
                type: 'error'
            }
        } finally {
            processingFormEdit.value = false;
        }
    }
    const handleFrontPageChange = event => {
    game.value.file = event.target.files[0]

    // Previsualizacion:
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      game.value.preview = reader.result
    })

    reader.readAsDataURL(game.value.file)
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
        feedback,
        game,
        loadingGame,
        handleEditGame,
        handleFrontPageChange
    }
}
</script>

<template>
    <PrincipalTitle class="text-center mt-[5vh]">Editando el juego: <b>{{ loadingGame ?'...cargando juego': gameName }}</b></PrincipalTitle>
    <form action="#" class="max-w-[520px] sm:mx-auto m-2" @submit.prevent="handleEditGame">
        <div>
            <div>
            <BaseLabel for="photo">Imagen de perfil </BaseLabel>
            <input
                class="w-full py-1.5 px-2 border border-yellow-900 rounded mb-3 disabled:bg-slate-400"
                type="file"
                :disabled="processingFormEdit"
                @change="handleFrontPageChange"
            />
            </div>
            <div v-if="game.preview != null">
            <p class="text-center">Previsualizacion de la imagen seleccionada: </p>
            <img 
            :src="game.preview" 
            alt="Previsualizacion de la imagen seleccionada" 
            class="my-2 mx-auto"
            />
            </div>
        </div>
        <div>
            <BaseLabel for="title">Titulo</BaseLabel>
            <BaseInput 
                type="text"
                id="title"
                :disabled="processingFormEdit"
                v-model="game.title"
            />
        </div>
        <div>
            <BaseLabel for="description">Descripcion</BaseLabel>
            <textarea 
                class="border border-yellow-900 w-full"
                id="description"
                name="description"
                :disabled="processingFormEdit"
                v-model="game.description"
            ></textarea>
        </div>
        <div>
            <BaseLabel for="price">Precio</BaseLabel>
            <BaseInput
                type="number"
                id="price"
                :disabled="processingFormEdit"
                v-model="game.price"
            />
        </div>
        <span v-if="feedback.message" class="text-red-600 text-center py-2">
            {{ feedback.message }}
        </span>
        <BaseButton :loading="processingFormEdit" color="yellow">Editar juego: {{ gameName }}</BaseButton>
    </form>
</template>
