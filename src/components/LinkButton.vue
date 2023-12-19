<script setup>
import { computed } from 'vue';

const props = defineProps({
    url: {
        type: String,
        default: '#',
        required: true,
    },
    internalLink: {
        type: String,
        default: 'internal',
    },
    color:{
        type: String,
        default: 'blue'
    }
})

const bgColors = computed(()=>{
    switch (props.color) {
        case "yellow":
          return "bg-yellow-600 hover:bg-yellow-500 focus:bg-yellow-500 active:bg-yellow-700";
          break;
        case "green":
          return "bg-green-600 hover:bg-green-500 focus:bg-green-500 active:bg-green-700";
          break;
        case "red":
          return "bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700";
          break;
        default:
          return "bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700";
          break;
      }
})
</script>
<template>
    <template v-if="internalLink == 'internal'">
        <router-link :to="props.url" :class="{
        'inline-flex': true,
        'items-center': true,
        'px-3': true,
        'py-2': true,
        'text-sm': true,
        'font-medium': true,
        'text-center': true,
        'text-white': true,
        [bgColors]: true, // Acceso directo a la propiedad computed
        }">
        <slot>dinosaurio</slot>
        </router-link>
    </template>
    <template v-else-if="internalLink == 'external'">
        <a :href="props.url" :class="{
        'inline-flex': true,
        'items-center': true,
        'px-3': true,
        'py-2': true,
        'text-sm': true,
        'font-medium': true,
        'text-center': true,
        'text-white': true,
        [bgColors]: true, // Acceso directo a la propiedad computed
        }"
        target="_blank">
            <slot>dinosaurio</slot>
        </a>
    </template>
</template>