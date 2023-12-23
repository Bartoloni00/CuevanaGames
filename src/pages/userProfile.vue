<script setup>
import { useRoute } from 'vue-router';

import LinkButton from '../components/LinkButton.vue';
import LoadingContext from '../components/LoadingContext.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';

import {useUser} from '../composition/useUser.js'
import UserDetails from '../components/UserDetails.vue';

const route = useRoute()
const {loadingProfile, userProfile} = useUser(route.params.id)
// podriamos añadirle niveles de subscripcion al usuario
// Juegos que posee (cuando creemos el carrito)
</script>
<template>
    <LoadingContext :loading="loadingProfile">
        <PrincipalTitle>Perfil Del usuario: {{ userProfile.email }}</PrincipalTitle>
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