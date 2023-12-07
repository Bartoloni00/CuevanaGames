<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'
import BaseInput from '../components/BaseInput.vue'
import PrincipalTitle from '../components/PrincipalTitle.vue';
import { createGame } from '../services/games.js';
import { subscribeToAuth } from '../services/auth.js'

export default {
    name: 'CreateGame',
    components: { BaseButton, BaseLabel, BaseInput, PrincipalTitle },
    data(){
        return {
            processingLogin: false,
            newGame: {
                title: '',
                description: '',
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
    methods: {
        createGame() {
            createGame({
                title: this.newGame.title,
                description: this.newGame.description,
                price: this.newGame.price,
            })
                .then(() => {
                this.newGame = {
                title: '',
                description: '',
                price: null,
            };
            this.$router.push({path: '/panel'})
            });
            
        },
    },
    mounted(){
        this.authUnsubscribe = subscribeToAuth(newUser => {
            this.user = newUser;
            });
    },
    unmounted() {
        this.authUnsubscribe();
    },
}
</script>

<template>
    <PrincipalTitle>Agregar Juego</PrincipalTitle>
    <form action="#" class="max-w-[520px] m-auto" @submit.prevent="createGame">
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
        <BaseButton :loading="processingLogin">Agregar juego</BaseButton>
    </form>
</template>