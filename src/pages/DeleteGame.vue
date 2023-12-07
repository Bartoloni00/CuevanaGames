<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLoader from '../components/BaseLoader.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';
import { subscribeToAuth } from '../services/auth.js';
import { getGameById, deleteGameById } from '../services/games.js';

    export default {
        name: 'DeleteGame',
        components:{ PrincipalTitle, BaseLoader, BaseButton },
        data(){
            return {
                loadingGame: true,
                user: {
                    id: null,
                    email: null,
                    rol: null,
                },
                authUnsubscribe: () => {},
                game: {
                    id: null,
                    title: null,
                    description: null,
                    price: null
                }
            }
        },
        methods:{
            deleteGame(){
                deleteGameById(this.$route.params.id)
                .then(
                    this.$router.push({path: '/panel'})
                )
            }
        },
        async mounted(){
            this.authUnsubscribe = subscribeToAuth(newUser => {
            this.user = newUser
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