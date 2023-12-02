<script>
import { chatSubscribeToMessage, chatSaveMessage } from '../services/chat.js'
import { subscribeToAuth } from '../services/auth.js'
import { formatDate } from '../helpers/date.js'
import BaseLabel from '../components/BaseLabel.vue'
import BaseButton from '../components/BaseButton.vue'
export default {
    name: 'Chat',
    components: { BaseButton, BaseLabel },
    data() {
        return {
            messages: [],
            newMessage: {
                user: '',
                message: '',
            },
            user: {
                id: null,
                email: null,
            },
            authUnSubscribe: () => {},
            chatUnSubscribe: () => {},
        };
    },
    methods: {
        sendMessage() {
            chatSaveMessage({
                user: this.user.email,
                message: this.newMessage.message,
            })
                .then(() => {
                this.newMessage = '';
            });
        },
        dateToString(date) {
            return formatDate(date)
        }
    },
    mounted() {
        this.chatUnSubscribe = chatSubscribeToMessage(messages => {
            this.messages = messages;
        });
        this.authUnSubscribe = subscribeToAuth(newUser => {
            this.user = {...newUser}
        });
    },
    unmounted() {
        // Limpiamos la subscripcion a auth
        this.authUnSubscribe()
        this.chatUnSubscribe()
    }
}
</script>
<template>
    <h1 class="mb-4 text-3xl">Impresionante chat en tiempo real</h1>
        <div class="flex gap-4 w-full justify-between">
            <div>
                <div v-for="message in messages" class="mb-2">
                    <div><b>Usuario:</b> {{ message.user }}</div>
                    <div><b>Mensaje:</b> {{ message.message }}</div>
                    <div class="text-right">{{ dateToString(message.created_at) }}</div>
                </div>
            </div>
            <form action="#" @submit.prevent="sendMessage" class="min-w-[320px]">
                <div class="flex gap-2">
                <BaseLabel for="user">Usuario</BaseLabel>
                <p>{{ this.user.email }}</p>
                </div>
                <div>
                <BaseLabel for="message">Mensaje</BaseLabel>
                <textarea 
                    class="border border-yellow-900 w-full"
                    id="message"
                    name="message"
                    v-model="newMessage.message"></textarea>
                </div>
                <BaseButton color="green">Enviar mensaje</BaseButton>
            </form>
        </div>
</template>