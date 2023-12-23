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
    <section class="flex gap-4">
        <picture class="w-2/12">
          <PhotoDefault
            class="max-w-full"
            :element="user"
            :is-game="false"
          />
        </picture>
        <ul class="w-10/12">
          <li class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Usuario:</span> <b>{{ user.displayName ? user.displayName : 'no posee nombre de usuario'}}</b>
          </li>
          <li class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Nivel:</span> <b>{{ user.level ? user.level : 'usuario nivel 0'}}</b>
          </li>
          <li class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Email:</span> <b>{{ user.email }}</b>
          </li>
          <li class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Rol:</span> <b>{{ user.rol }}</b>
          </li>
        </ul>
    </section>
</template>