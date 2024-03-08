<script setup>
import { computed } from 'vue';

import BaseLoader from "./BaseLoader.vue";

const props = defineProps({
    color: {
      type: String,
      default: "yellow",
    },
    loading: {
      type: Boolean,
      default: false,
    }
  })

const bgColors = computed(()=> {
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
        case "blue":
          return "bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700";
        break;
        default:
          return "bg-[#ff7f0a] hover:bg-[#FF6600] focus:bg-[#cc4902] active:bg-[#cc4902]";
        break;
    }
  })
</script>

<template>
  <button type="submit" :class="`transition w-full p-2 text-white ${bgColors} rounded-lg`">
    <BaseLoader v-if="loading"/>
    <slot v-else>Enviar</slot>
  </button>
</template>
