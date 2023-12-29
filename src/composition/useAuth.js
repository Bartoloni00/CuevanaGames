import {ref, onMounted, onUnmounted} from "vue"
import {subscribeToAuth} from "@/services/auth.js"

export function useAuth () {
    const user = ref({
    id: null,
    email: null,
    rol: null,
    displayName: null,
    photoURL: null,
    level: null,
    fullProfileLoaded: false,
  })
  const loadingUser = ref(true)
  let authUnsubscribe =  () => {}
  
  onMounted(() => {
      loadingUser.value = true;
      authUnsubscribe.value = subscribeToAuth((userAuth) => (user.value = userAuth));
      loadingUser.value = false;
    })
  
  onUnmounted(() => authUnsubscribe())
  
  return {
    user,
    loadingUser
  }
  }