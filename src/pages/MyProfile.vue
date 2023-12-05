<script>
import {subscribeToAuth} from '../services/auth.js'
import BaseLoader from '../components/BaseLoader.vue'

export default {
    name: 'MyProfile',
    data() {
        return {
            user: {
                id: null,
                email: null,
                rol: null,
            },
            loadingUser: true,
            authUnsubscribe: () => { },
        };
    },
    mounted() {
        this.loadingUser = true;
        this.authUnsubscribe = subscribeToAuth(user => this.user = user);
        this.loadingUser = false;
    },
    unmounted() {
        this.authUnsubscribe = () => { };
    },
    components: { BaseLoader }
}
</script>
<template>
    <h1>Mi perfil</h1>
    <template v-if="!loadingUser">
        <div>
            <span class="block">Email: {{ user.email }}</span>
            <span>Rol: {{ user.rol }}</span>
        </div>
    </template>
    <template v-else>
        <BaseLoader/>
    </template>
</template>