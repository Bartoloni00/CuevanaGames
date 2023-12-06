<script>
import { getPrivateChatsForUser } from '../services/chat.js'
import { subscribeToAuth } from '../services/auth.js'
import PrincipalTitle from '../components/PrincipalTitle.vue'

export default {
    name: 'DashBoard',
    data() {
        return {
            loadingChats: true,
            chats: [],
            user: {
                id: null,
                email: null,
                rol: null,
            },
            authUnsubscribe: () => {},
            chatsUnsubscribe: () => {},
        };
    },
    async mounted() {
        this.loadingChats = true;
        this.chatsUnsubscribe = getPrivateChatsForUser(this.user.id, chats => {
            console.log(chats);
            this.chats = chats;
            this.loadingChats = false;
        });
        this.authUnsubscribe = subscribeToAuth(newUser => {
            this.user = newUser;
        });
    },
    unmounted() {
        this.chatsUnsubscribe();
        this.authUnsubscribe();
    },
    components: { PrincipalTitle }
}
</script>

<template>
    <PrincipalTitle>Dashboard</PrincipalTitle>
    <router-link to="/panel/agregar-juego">Agregar Juego</router-link>
    <div v-for="chat in chats" class="mb-2">
                    <div>
                        <b>Usuario: </b> 
                        <router-link :to="`/usuario/${chat.userId}`" class="text-blue-600">{{ chat.user }}</router-link>
                    </div>
                    <div><b>Mensaje:</b> {{ chat.chat }}</div>
                    <div class="text-right">{{ dateToString(chat.created_at) }}</div>
                </div>
</template>