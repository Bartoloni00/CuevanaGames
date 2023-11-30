<script>
import { chatSubscribeToMessage, chatSaveMessage } from '../services/chat.js'

export default {
    name: 'Chat',
    data() {
        return {
            messages:[],
            newMessage: {
                user: '',
                message: '',
        }
        }
    },
    methods: {
        sendMessage() {
            chatSaveMessage({
                user: this.newMessage.user,
                message: this.newMessage.message,
            })
            .then(()=>{
                this.newMessage = ''
            })
        },
    },
    mounted() {
        chatSubscribeToMessage(messages => {
            this.messages = messages
        })
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
                </div>
            </div>
            <form action="#" @submit.prevent="sendMessage" class="min-w-[320px]">
                <label>
                <span class="block">Usuario</span>
                <input 
                    class="border border-yellow-900 w-full"
                    type="text" 
                    id="user"
                    v-model="newMessage.user">
                </label>
                <label>
                <span class="block">Mensaje</span>
                <textarea 
                    class="border border-yellow-900 w-full"
                    id="message"
                    v-model="newMessage.message"></textarea>
                </label>
                <button 
                type="submit" 
                class="block w-full py-1 bg-yellow-900 text-white"
                >Enviar</button>
            </form>
        </div>
</template>