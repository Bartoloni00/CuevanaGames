<script>
import { chatSubscribeToMessage, chatSaveMessage } from "../services/chat.js";
import { subscribeToAuth } from "../services/auth.js";
import { formatDate } from "../helpers/date.js";
import BaseLabel from "../components/BaseLabel.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseLoader from "../components/BaseLoader.vue";
import PrincipalTitle from "../components/PrincipalTitle.vue";
export default {
  name: "Chat",
  components: { BaseButton, BaseLabel, BaseLoader, PrincipalTitle },
  data() {
    return {
      loadingMessages: true,
      messages: [],
      newMessage: {
        user: "",
        message: "",
      },
      user: {
        id: null,
        email: null,
        rol: null,
      },
      authUnSubscribe: () => {},
      chatUnSubscribe: () => {},
    };
  },
  methods: {
    sendMessage() {
      chatSaveMessage({
        userId: this.user.id,
        user: this.user.email,
        message: this.newMessage.message,
      }).then(() => {
        this.newMessage = "";
      });
    },
    dateToString(date) {
      return formatDate(date);
    },
  },
  mounted() {
    (this.loadingMessages = true),
      (this.chatUnSubscribe = chatSubscribeToMessage((messages) => {
        this.messages = messages;
        this.loadingMessages = false;
      }));
    this.authUnSubscribe = subscribeToAuth((newUser) => {
      this.user = { ...newUser };
    });
  },
  unmounted() {
    // Limpiamos la subscripcion a auth
    this.authUnSubscribe();
    this.chatUnSubscribe();
  },
};
</script>
<template>
  <PrincipalTitle>Impresionante chat en tiempo real</PrincipalTitle>
  <div class="flex gap-4 w-full justify-between">
    <div>
      <template v-if="this.loadingMessages">
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
          <div class="text-right">{{ dateToString(message.created_at) }}</div>
        </div>
      </template>
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
          v-model="newMessage.message"
        ></textarea>
      </div>
      <BaseButton color="green">Enviar mensaje</BaseButton>
    </form>
  </div>
</template>
