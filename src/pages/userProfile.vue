<script>
import BaseLoader from '../components/BaseLoader.vue';
import { getUserById } from '../services/user';

export default {
    name: 'UserProfile',
    components: { BaseLoader },
    data() {
        return {
            loadingProfile: true,
            userProfile: {
                id: null,
                email: null
            }
        };
    },
    async mounted() {
        this.loadingProfile = true;
        const userData = await getUserById(this.$route.params.id);
        this.userProfile = {
            id: userData.id,
            email: userData.email
        }
        this.loadingProfile = false;
    },
}
</script>
<template>
    <template v-if="loadingProfile">
        <BaseLoader />
    </template>
    <template v-else>
        <h1>Perfil Del usuario: {{ userProfile.email }}</h1>

        <router-link :to="`/usuario/${userProfile.id}/chat`" class="bg-yellow-700 px-2 py-1 m-2 rounded-md">Iniciar chat</router-link>
    </template>
</template>