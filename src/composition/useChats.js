import { onMounted, ref } from "vue";
import { getAllUsers } from "@/services/user.js";

export function useChats () {
    const loadingChats = ref(false)
    const chats = ref([])
  
    onMounted(async()=>{
      loadingChats.value = true;
      getAllUsers().then((allChats) => {
        chats.value = allChats;
        loadingChats.value = false;
      });
    })
  
    return {
      loadingChats,
      chats,
    }
  }