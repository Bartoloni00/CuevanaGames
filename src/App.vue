<script setup>
import { ref, provide, readonly } from "vue";
import NotificationMessage from "@/components/NotificationMessage.vue";
import GeneralFooter from "@/components/app/GeneralFooter.vue";
import GeneralNavBar from "@/components/app/GeneralNavBar.vue";

const notification = ref({
  message:null,
  type: 'success',
})

function setNotifications(data, time = 10000) {
  notification.value = {...data}
  setTimeout(() => {
    handleCloseNotification()
  }, time)
}

function handleCloseNotification(){
  clearNotification()
}

function clearNotification(){
  notification.value = {
  message:null,
  type: 'success',
}
}

// definimos el proveedor del servicio de notificacion
provide('notification',{
  notification: readonly(notification),// solo lectura
  setNotifications,
})
</script>
<template>
<GeneralNavBar/>
  <main class="container m-auto h-full bg-slate-50">
    <Transition name="fade">
      <NotificationMessage
        v-if="notification.message"
        :notification="notification"
        @close="handleCloseNotification"
      />
    </Transition>
    <router-view></router-view>
  </main>
  <GeneralFooter/>
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
/* .fade-enter-to, esto es algo por defecto
.fade-leave-to{
  opacity: 1;
} */
</style>