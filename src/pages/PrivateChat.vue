<script setup>
import BaseButton from "@/components/BaseButton.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import PrincipalTitle from "@/components/PrincipalTitle.vue";
import Loadingcontext from "@/components/loadingcontext.vue";
import { formatDate } from "@/helpers/date.js";
import {sendPrivateMessage,subscribeToPrivateChat} from "@/services/private-chat.js";
import { useAuth } from "@/composition/useAuth";
import { useUser } from "@/composition/useUser";
import { useRoute } from "vue-router";
import { watch, onUnmounted, ref } from "vue";

const route = useRoute()
// con esta sintaxis user pasa a ser userAuth en este archivo
const {user: userAuth} = useAuth()
const {userProfile,loadingProfile} = useUser(route.params.id)
const {loadingMessages, messages} = usePrivateChatMessages(userAuth, userProfile)
const {newMessage, handleMessage} = usePrivateChatForm(userAuth, userProfile)

function usePrivateChatMessages(senderUser, receiverUser){
  const loadingMessages = ref(true)
  const messages = ref([])

  let chatUnSubscribe = () => {}
// observamos el valor del receiverUser hasta que tengamos su data
  watch(receiverUser, async newReceiverUser => {
    if(newReceiverUser.id !== null) {
      loadingMessages.value = true;
    chatUnSubscribe.value = subscribeToPrivateChat(
      { user1: newReceiverUser.id, user2: senderUser.value.id},
      (newMessages) => (messages.value = newMessages)
    );
    loadingMessages.value = false;
    }
  })

  onUnmounted(()=>chatUnSubscribe())
  return {
    loadingMessages,
    messages,
  }
}

function usePrivateChatForm(senderUser, receiverUser){
  const newMessage = ref({
    message: ""
  })

  const handleMessage = () => {
    sendPrivateMessage({
        sender: senderUser.value.id,
        receiver: receiverUser.value.id,
        message: newMessage.value.message,
      });
      newMessage.value.message = "";
  }

  return {
    newMessage,
    handleMessage,
  }
}
</script>
<template>
  <Loadingcontext :loading="loadingProfile">
    <PrincipalTitle class="text-center mt-[5vh]">Chat privado con: {{ userProfile.email }}</PrincipalTitle>
    <section>
      <h2 class="text-center">Mensajes</h2>
      <Loadingcontext :loading="loadingMessages">
        <div
          class="flex flex-col bg-slate-100 p-2.5 overflow-y-scroll h-[50vh]"
        >
          <div
            v-for="message in messages"
            class="mb-2 rounded-lg max-w-[66%]"
            :class="{
              'self-start': message.userId !== userAuth.id,
              'bg-slate-300': message.userId !== userAuth.id,
              'self-end': message.userId === userAuth.id,
              'bg-green-300': message.userId === userAuth.id,
            }"
          >
              <article>
                <p class="p-2">{{ message.message }}</p>
                <div class="text-right p-2">
                  {{ formatDate(message.created_at) || "enviando..." }}
                </div>
              </article>
          </div>
        </div>
      </Loadingcontext>
    </section>
    <section>
      <h2 class="sr-only">Enviar un mensaje</h2>
      <form action="#" @submit.prevent="handleMessage" class="flex gap-1 max-w-[800px] mx-auto">
        <BaseLabel for="message" class="sr-only">Mensaje</BaseLabel>
        <textarea
          class="border border-yellow-900 w-[90%] resize-none outline-none border-b-0"
          id="message"
          name="message"
          v-model="newMessage.message"
          @keydown.enter.prevent="handleMessage"
        ></textarea
        >
        <BaseButton type="submit" class="w-[10%]">Enviar</BaseButton>
        <!-- Agrega el tipo "submit" al botón -->
      </form>
    </section>
  </Loadingcontext>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}
</style>