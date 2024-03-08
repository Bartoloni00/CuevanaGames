<script setup>
import PhotoDefault from './PhotoDefault.vue';

    const props = defineProps({
        user: {
            type: Object,
            required: true,
        }
    })
</script>
<template>
    <section class="flex flex-col mx-auto gap-4 mx-auto mb-10 max-w-[400px]">
        <picture class="mx-auto">
          <PhotoDefault
          class="w-max-full max-w-[400px]"
            :element="user"
            :is-game="false"
          />
        </picture>
        <ul>
          <li class="text-left px-2.5 py-1.5 rounded-lg my-4 flex gap-2 border hover:border-[#FF6600] w-full min-w-[300px]">
            <img src="/icons/username.svg" alt="icono para nombre de usuario">
            <span class="capitalize">Usuario: </span> 
            <b>{{ user.displayName ? user.displayName : 'no posee nombre de usuario'}}</b>
          </li>
          <li class="text-left px-2.5 py-1.5 rounded-lg my-4 flex gap-2 border hover:border-[#FF6600] w-full min-w-[300px]">
            <img src="/icons/level.svg" alt="icono para el nivel del usuario">
            <span class="capitalize">Nivel:</span> 
            <b>{{ user.level ? user.level : 'usuario nivel 0'}}</b>
          </li>
          <li class="text-left px-2.5 py-1.5 rounded-lg my-4 flex gap-2 border hover:border-[#FF6600] w-full min-w-[300px]">
            <img src="/icons/contact_mail.svg" alt="icono para el email del usuario">
            <span class="capitalize">Email:</span> 
            <b>{{ user.email }}</b>
          </li>
          <li class="text-left px-2.5 py-1.5 rounded-lg my-4 flex gap-2 border hover:border-[#FF6600] w-full min-w-[300px]">
            <img src="/icons/rol.svg" alt="icono para el rol del usuario">
            <span class="capitalize">Rol:</span> 
            <b>{{ user.rol }}</b>
          </li>
        </ul>
    </section>
</template>