import { getAllGames } from "@/services/games.js";
import { onMounted, ref } from "vue";

export function useGames () {
    const loadingGames = ref(true)
    const games = ref([])
    
    onMounted(async () => {
        loadingGames.value = true;
        getAllGames().then((allGames) => {
          games.value = allGames;
          loadingGames.value = false;
        });
        
    })
    
    return {
      loadingGames,
      games
    }
    }