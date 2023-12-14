<script>
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseLoader from "../components/BaseLoader.vue";
import { getUserById } from "../services/user.js";
import { subscribeToAuth } from "../services/auth.js";
import { formatDate } from "../helpers/date.js";
import {
  sendPrivateMessage,
  subscribeToPrivateChat,
} from "../services/private-chat.js";
import PrincipalTitle from "../components/PrincipalTitle.vue";

export default {
  name: "PrivateChat",
  components: { BaseLoader, BaseLabel, BaseButton, PrincipalTitle },
  data() {
    return {
      loadingMessages: true,
      messages: [],
      loadingProfile: true,
      userProfile: {
        id: null,
        email: null,
      },
      userAuth: {
        id: null,
        email: null,
        rol: null,
      },
      newMessage: {
        message: "",
      },
      authUnsubscribe: () => {},
      messageUnsubscribe: () => {},
    };
  },
  methods: {
    handleMessage() {
      sendPrivateMessage({
        sender: this.userAuth.id,
        receiver: this.userProfile.id,
        message: this.newMessage.message,
      });
      this.newMessage.message = "";
    },
    dateToString(date) {
      return formatDate(date);
    },
  },
  async mounted() {
    this.loadingProfile = true;
    this.userProfile = await getUserById(this.$route.params.id);
    this.authUnsubscribe = subscribeToAuth((user) => (this.userAuth = user));
    this.loadingProfile = false;
    this.loadingMessages = true;
    this.messageUnsubscribe = await subscribeToPrivateChat(
      { user1: this.userProfile.id, user2: this.userAuth.id },
      (newMessages) => (this.messages = newMessages)
    );
    this.loadingMessages = false;
  },
  unmounted() {
    this.authUnsubscribe();
  },
};
</script>
<template>
  <template v-if="!loadingProfile">
    <PrincipalTitle>Chat privado con: {{ userProfile.email }}</PrincipalTitle>
    <section>
      <h2>Mensajes</h2>
      <template v-if="this.loadingMessages">
        <div class="flex justify-center items-center w-screen h-screen">
          <BaseLoader />
        </div>
      </template>
      <template v-else>
        <div
          class="flex flex-col bg-slate-100 p-2.5 overflow-y-scroll max-h-[600px]"
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
            <p class="p-2">{{ message.message }}</p>
            <div class="text-right p-2">
              {{ dateToString(message.created_at) || "enviando..." }}
            </div>
          </div>
        </div>
      </template>
    </section>
    <section>
      <h2 class="sr-only">Enviar un mensaje</h2>
      <form action="#" @submit.prevent="handleMessage" class="flex flex-col">
        <BaseLabel for="message" class="sr-only">Mensaje</BaseLabel>
        <textarea
          class="border border-yellow-900 w-full resize-none outline-none border-b-0"
          id="message"
          name="message"
          v-model="newMessage.message"
          @keydown.enter.prevent="handleMessage"
        >
  ></textarea
        >
        <BaseButton type="submit" class="w-1/12">Enviar</BaseButton>
        <!-- Agrega el tipo "submit" al botón -->
      </form>
    </section>
  </template>
  <template v-else>
    <BaseLoader />
  </template>
</template>
