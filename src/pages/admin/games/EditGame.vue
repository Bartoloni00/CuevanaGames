<script>
import BaseButton from '../../../components/BaseButton.vue';
import BaseLabel from '../../../components/BaseLabel.vue'
import BaseInput from '../../../components/BaseInput.vue'
import PrincipalTitle from '../../../components/PrincipalTitle.vue';
import { subscribeToAuth } from '../../../services/auth.js'
import { getGameById, updateGameById } from '../../../services/games.js'

export default {
    name: 'EditGame',
    components: { BaseButton, BaseLabel, BaseInput, PrincipalTitle },
    data(){
        return {
            loadingGame: true,
            processingLogin: false,
            game: {
                title: null,
                description: null,
                id: null,
                price: null,
            },
            user: {
                id: null,
                email: null,
                rol: null,
            },
            authUnsubscribe: () => {},
        }
    },
    methods:{
        async editGame(){
            if(this.processingLogin) return;

            this.processingLogin = true;

            const updatedGameData = {
                title: this.game.title,
                description: this.game.description,
                price: this.game.price,
            };

            try {
                await updateGameById(this.game.id, updatedGameData);
                this.$router.push({ path: '/panel' });
            } catch (error) {
                console.error('Error al editar el juego:', error);
            } finally {
                this.processingLogin = false;
            }
        }
    },
    async mounted(){
        this.authUnsubscribe = subscribeToAuth(newUser => {
            this.user = newUser;
        })
        this.loadingGame = true
        this.game = await getGameById(this.$route.params.id)
        this.loadingGame = false
    },
    unmounted(){
        this.authUnsubscribe()
    }
}
</script>

<template>
    <PrincipalTitle>Editando el juego: <b>{{ loadingGame ?'...cargando juego': game.title }}</b></PrincipalTitle>
    <form action="#" class="max-w-[520px] m-auto" @submit.prevent="editGame">
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
        <BaseButton :loading="processingLogin">Editar juego: {{ game.title }}</BaseButton>
    </form>
</template>
