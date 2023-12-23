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
    <div class="flex gap-4">
        <div class="w-2/12">
          <PhotoDefault
            class="max-w-full"
            :element="user"
            :is-game="false"
          />
        </div>
        <div class="w-10/12">
          <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Nombre de usuario:</span> <b>{{ user.displayName ? user.displayName : 'no posee nombre de usuario'}}</b>
          </p>
          <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Nivel:</span> <b>{{ user.level ? user.level : 'usuario nivel 0'}}</b>
          </p>
          <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Email:</span> <b>{{ user.email }}</b>
          </p>
          <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
            <span class="capitalize">Rol:</span> <b>{{ user.rol }}</b>
          </p>
        </div>
      </div>
</template>