<script setup>
import { useRoute } from 'vue-router';

import LinkButton from '../components/LinkButton.vue';
import LoadingContext from '../components/LoadingContext.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';

import {useUser} from '../composition/useUser.js'

const route = useRoute()
const {loadingProfile, userProfile} = useUser(route.params.id)
// podriamos añadirle niveles de subscripcion al usuario
// Juegos que posee (cuando creemos el carrito)
</script>
<template>
    <LoadingContext :loading="loadingProfile">
        <PrincipalTitle>Perfil Del usuario: {{ userProfile.email }}</PrincipalTitle>
      <div>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Nombre de usuario:</span> <b>{{ userProfile.displayName ? userProfile.displayName : 'no posee nombre de usuario'}}</b>
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Nivel:</span> <b>{{ userProfile.level ? userProfile.level : 'usuario nivel 0'}}</b>
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Email:</span> <b>{{ userProfile.email }}</b>
        </p>
        <p class="text-left bg-slate-100 px-2.5 py-1.5 rounded-lg my-4">
          <span class="capitalize">Rol:</span> <b>{{ userProfile.rol }}</b>
        </p>
      </div>
        <LinkButton
        :url="`/usuario/${userProfile.id}/chat`"
        color="yellow"
        >
        Iniciar chat
        </LinkButton>
    </LoadingContext>
</template>