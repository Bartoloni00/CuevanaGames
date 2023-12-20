<script setup>
import { chatSubscribeToMessage, chatSaveMessage } from "../services/chat.js";
import { formatDate } from "../helpers/date.js";
import BaseLabel from "../components/BaseLabel.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLoader from "../components/BaseLoader.vue";
import PrincipalTitle from "../components/PrincipalTitle.vue";
import { useAuth } from "../composition/useAuth";
import { onMounted, onUnmounted, ref } from "vue";

const {user} = useAuth()
const {loadingMessages, messages} = useChatMessages()
const {newMessage, sendMessage} = useChatForm()

function useChatMessages(){
  const loadingMessages = ref(true)
  const messages = ref([])

  let chatUnSubscribe = () => {}

  onMounted(()=>{
    loadingMessages.value = true
      chatUnSubscribe = chatSubscribeToMessage((messages) => {
        messages.value = messages;
        loadingMessages.value = false;
      })
  })
  onUnmounted(()=>chatUnSubscribe())

  return {
    loadingMessages,
    messages,
  }
}

function useChatForm(user) {
  const newMessage = ref({
    message: "",
  })

  const sendMessage = async () => {
    try {
      chatSaveMessage({
        userId: user.value.id,
        user: user.value.email,
        message: newMessage.value.message,
      }).then(() => {
        newMessage.value = "";
      })
    } catch (error) {
      // TODO: manejar errores
    }
  }
  return {
    newMessage,
    sendMessage,
  }
}
</script>
<template>
  <PrincipalTitle>Impresionante chat en tiempo real</PrincipalTitle>
  <div class="flex gap-4 w-full justify-between">
    <div>
      <template v-if="loadingMessages">
        <BaseLoader />
      </template>
      <template v-else>
        <div v-for="message in messages" class="mb-2">
          <div>
            <b>Usuario: </b>
            <router-link
              :to="`/usuario/${message.userId}`"
              class="text-blue-600"
              >{{ message.user }}</router-link
            >
          </div>
          <div><b>Mensaje:</b> {{ message.message }}</div>
          <div class="text-right">{{ formatDate(message.created_at) }}</div>
        </div>
      </template>
    </div>
    <form action="#" @submit.prevent="sendMessage" class="min-w-[320px]">
      <div class="flex gap-2">
        <BaseLabel for="user">Usuario</BaseLabel>
        <p>{{ user.email }}</p>
      </div>
      <div>
        <BaseLabel for="message">Mensaje</BaseLabel>
        <textarea
          class="border border-yellow-900 w-full"
          id="message"
          name="message"
          v-model="newMessage.message"
        ></textarea>
      </div>
      <BaseButton color="green">Enviar mensaje</BaseButton>
    </form>
  </div>
</template>
