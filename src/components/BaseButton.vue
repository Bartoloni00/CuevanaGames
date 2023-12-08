<script>
import BaseLoader from "./BaseLoader.vue";

export default {
  name: "BaseButton",
  props: {
    color: {
      type: String,
      default: "yellow",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bgColors() {
      switch (this.color) {
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
    },
  },
  components: { BaseLoader },
};
</script>

<template>
  <button type="submit" :class="`transition w-full p-2 text-white ${bgColors}`">
    <BaseLoader v-if="this.loading" />
    <slot v-else>Enviar</slot>
  </button>
</template>
