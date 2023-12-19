import { onMounted, ref } from 'vue';

import { getUserById } from '../services/user';
import { useRoute } from 'vue-router';

export function useUser () {
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