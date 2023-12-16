<script setup>
import { onMounted, ref } from 'vue';
import BaseLoader from '../components/BaseLoader.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';
import { getUserById } from '../services/user';
import { useRoute } from 'vue-router';

const {loadingProfile, userProfile} = useUserProfile()

function useUserProfile () {
    const route = useRoute()

    const loadingProfile = ref(true)
    const userProfile = ref({
        id: null,
        email: null
    })

    // utilizar el ciclo de vida mounted con api composition
    onMounted(async () => {
        loadingProfile.value = true;
        const userData = await getUserById(route.params.id);
        userProfile.value = {
            id: userData.id,
            email: userData.email
        }
        loadingProfile.value = false;
    })

    return {
        loadingProfile,
        userProfile,
    }
}

</script>
<template>
    <template v-if="loadingProfile">
        <BaseLoader />
    </template>
    <template v-else>
        <PrincipalTitle>Perfil Del usuario: {{ userProfile.email }}</PrincipalTitle>

        <router-link :to="`/usuario/${userProfile.id}/chat`" class="bg-yellow-700 px-2 py-1 m-2 rounded-md">Iniciar chat</router-link>
    </template>
</template>