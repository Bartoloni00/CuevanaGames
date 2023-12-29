<script setup>
import { useRoute } from 'vue-router';

import LinkButton from '@/components/LinkButton.vue';
import LoadingContext from '@/components/LoadingContext.vue';
import PrincipalTitle from '@/components/PrincipalTitle.vue';
import UserDetails from '@/components/UserDetails.vue';

import {useUser} from '@/composition/useUser.js'

const route = useRoute()
const {loadingProfile, userProfile} = useUser(route.params.id)
// podriamos añadirle niveles de subscripcion al usuario
// Juegos que posee (cuando creemos el carrito)
</script>
<template>
    <LoadingContext :loading="loadingProfile">
        <PrincipalTitle class="mt-[5vh] text-center">Perfil Del usuario: {{ userProfile.email }}</PrincipalTitle>
        <UserDetails
          :user="userProfile"
        />
        <LinkButton
        :url="`/usuario/${userProfile.id}/chat`"
        color="yellow"
        >
        Iniciar chat
        </LinkButton>
    </LoadingContext>
</template>