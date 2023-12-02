<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { getUserById } from '../services/user.js';
import { subscribeToAuth } from '../services/auth.js';
import {sendPrivateMessage} from '../services/private-chat.js'

export default {
    name: 'PrivateChat',
    components: { BaseLoader, BaseLabel, BaseButton },
    data(){
        return {
            loadingProfile: true,
            userProfile: {
                id:null,
                email: null,
            },
            userAuth:{
                id: null,
                email: null
            },
            newMessage:{
                message:'',
            },
            authUnsubscribe: ()=>{},
        }
    },
    methods: {
        handleMessage(){
            sendPrivateMessage({
                sender:this.userAuth.id,
                receiver:this.userProfile.id,
                message: this.newMessage.message
            })
            this.newMessage.message = ''
        }
    },
    async mounted() {
        this.loadingProfile = true
        this.userProfile = await getUserById(this.$route.params.id)
        this.authUnsubscribe = subscribeToAuth(user => this.userAuth = user)
        this.loadingProfile = false
    },
    unmounted(){
        this.authUnsubscribe()
    },
}
</script>
<template>
    <template v-if="!loadingProfile">
        <h1>Chat privado con: {{ userProfile.email }}</h1>
        <section>
            <h2>Mensajes</h2>
            <!-- Lista de mensajes -->
        </section>
        <section>
            <h2 class="sr-only">Enviar un mensaje</h2>
            <form action="#" @submit.prevent="handleMessage" class="flex">
                <BaseLabel 
                for="message"
                class="sr-only"
                >Mensaje</BaseLabel>
                <textarea 
                    class="border border-yellow-900 w-11/12"
                    id="message"
                    name="message"
                    v-model="newMessage.message"></textarea>
                <BaseButton class="w-1/12">Enviar</BaseButton>
            </form>
        </section>
    </template>
    <template v-else>
        <BaseLoader/>
    </template>
</template>