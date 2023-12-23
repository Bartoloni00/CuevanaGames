<script setup>
const props = defineProps({
    element:{
        type: Object,
        required: true,
    },
    isGame:{
        type: Boolean,
        default: true
    }
})
</script>
<template>
    <img 
        v-if="element.photoURL" 
        :src="element.photoURL" 
        :alt="isGame?`Portada del juego: ${element.title}`:`Avatar del usuarios: ${element.displayName ?? element.email}`"
    >
    <img 
        v-else 
        :src="isGame?'/frontPageDefault.jpg':'/avatarDefault.png'" 
        :alt="isGame?'Portada por defecto para los juegos': 'Avatar default'"
    >
</template>