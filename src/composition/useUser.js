import { onMounted, ref } from 'vue';

import { getUserById } from '@/services/user';
// import { fetchUserProfile } from '../services/auth';

export function useUser (id) {

    const loadingProfile = ref(true)
    const userProfile = ref({
        id: null,
        email: null,
        displayName: null,
        rol: null,
        level: null,
        fullProfileLoaded: false,
    })

    // utilizar el ciclo de vida mounted con api composition
    onMounted(async () => {
        loadingProfile.value = true;
        userProfile.value = await getUserById(id);
        // userProfile.value = await fetchUserProfile(id)
        loadingProfile.value = false;
    })

    return {
        loadingProfile,
        userProfile,
    }
}