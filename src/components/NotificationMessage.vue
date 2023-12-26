<script setup>
import { computed } from 'vue';

const NOTIFICATION_CLASSES = {
    success: 'bg-green-200 border-green-700',
    error: 'bg-red-200 border-red-700',
    error: 'bg-blue-200 border-blue-700',
}
const NOTIFICATION_CLASSES_BUTTON = {
    success: 'text-green-700',
    error: 'text-red-700',
    error: 'text-blue-700',
}
const NOTIFICATION_ICONS = {
    success: {url:'/icons/success.svg',text:'exito'},
    error: {url:'/icons/error.svg',text:'error'},
    info: {url:'/icons/info.svg',text:'informacion'},
}
const notificacionClasses = computed(()=> NOTIFICATION_CLASSES[props.notification.type] || null)
const notificacionButton = computed(()=> NOTIFICATION_CLASSES_BUTTON[props.notification.type] || null)
const notificationIcon = computed(()=> NOTIFICATION_ICONS[props.notification.type] || null)

defineEmits(['close',])

const props = defineProps({
  notification: {
    type: Object,
    required: true,
    default: () => ({ message: null, type: null }),
  },
});
</script>

<template>
  <div 
    class="p-2 mb-2 m-auto text-center capitalize rounded relative border"
    :class="notificacionClasses"
  >
    <img 
      :src="notificationIcon.url" 
      :alt="notificationIcon.text"
      class="absolute left-0 top-2 button-0 px-3"
      >
    {{ props.notification.message }} 
    <button 
        type="button" 
        class="text-3xl absolute right-0 top-0 button-0 px-3"
        :class="notificacionButton"
        @click="$emit('close')"
        >&times;</button>
  </div>
  
</template>
