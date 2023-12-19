<script setup>
import BaseLoader from '../components/BaseLoader.vue';
import LinkButton from '../components/LinkButton.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';

import {useUser} from '../composition/useUser.js'

const {loadingProfile, userProfile} = useUser()

</script>
<template>
    <template v-if="loadingProfile">
        <BaseLoader />
    </template>
    <template v-else>
        <PrincipalTitle>Perfil Del usuario: {{ userProfile.email }}</PrincipalTitle>

        <!-- <router-link :to="`/usuario/${userProfile.id}/chat`" class="bg-yellow-700 px-2 py-1 m-2 rounded-md">Iniciar chat</router-link> -->
        <LinkButton
        :url="`/usuario/${userProfile.id}/chat`"
        color="yellow"
        >
        Iniciar chat
        </LinkButton>
    </template>
</template>