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
        default: 'black'
    }
})

const bgColors = computed(()=>{
    switch (props.color) {
        case "yellow":
          return "bg-[#ff7f0a] hover:bg-[#FF6600] focus:bg-[#cc4902] active:bg-[#cc4902]";
          break;
        case "green":
          return "bg-green-600 hover:bg-green-500 focus:bg-green-500 active:bg-green-700";
          break;
        case "red":
          return "bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700";
          break;
        default:
          return "bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 active:bg-gray-900";
          break;
      }
})
</script>
<template>
    <template v-if="internalLink == 'internal'">
        <router-link :to="props.url" :class="{
        'inline-flex': true,
        'rounded-lg':true,
        'items-center': true,
        'px-4': true,
        'py-2': true,
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
        'rounded-lg':true,
        'items-center': true,
        'px-4': true,
        'py-2': true,
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