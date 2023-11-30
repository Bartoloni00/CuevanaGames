<script>
import { chatSubscribeToMessage, chatSaveMessage } from '../services/chat.js'
import BaseLabel from '../components/BaseLabel.vue'
import BaseButton from '../components/BaseButton.vue'
export default {
    name: 'Chat',
    data() {
        return {
            messages: [],
            newMessage: {
                user: '',
                message: '',
            }
        };
    },
    methods: {
        sendMessage() {
            chatSaveMessage({
                user: this.newMessage.user,
                message: this.newMessage.message,
            })
                .then(() => {
                this.newMessage = '';
            });
        },
    },
    mounted() {
        chatSubscribeToMessage(messages => {
            this.messages = messages;
        });
    },
    components: { BaseButton, BaseLabel }
}
</script>
<template>
    <h1 class="mb-4 text-3xl">Impresionante chat en tiempo real</h1>
        <div class="flex gap-4 w-full justify-between">
            <div>
                <div v-for="message in messages" class="mb-2">
                    <div><b>Usuario:</b> {{ message.user }}</div>
                    <div><b>Mensaje:</b> {{ message.message }}</div>
                    <div class="text-right">{{ message.created_at }}</div>
                </div>
            </div>
            <form action="#" @submit.prevent="sendMessage" class="min-w-[320px]">
                <div>
                <BaseLabel>Usuario</BaseLabel>
                <input 
                    class="border border-yellow-900 w-full"
                    type="text" 
                    id="user"
                    name="user"
                    v-model="newMessage.user">
                </div>
                <div>
                <BaseLabel>Mensaje</BaseLabel>
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