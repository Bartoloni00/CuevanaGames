<script setup>
import { onMounted, ref } from 'vue';
import loadingcontext from '../components/loadingcontext.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';
import {getGameById} from '../services/games.js'
import { useRoute } from 'vue-router';
import GameDetails from '../components/GameDetails.vue';

const {loadingGame, game} = useGame()

function useGame () {
	const route = useRoute()

	const loadingGame = ref(true)
	const game = ref({
		id: null,
		title: null,
		description: null,
		price: null
	})

	onMounted(async () => {
		loadingGame.value = true
		game.value = await getGameById(route.params.id)
		loadingGame.value = false
	})

	return {
		loadingGame,
		game,
	}
}
</script>
<template>
	<PrincipalTitle>Detalles del juego: {{ !loadingGame? game.title: 'Cargando...'}}</PrincipalTitle>
	<loadingcontext :loading="loadingGame">
		<GameDetails 
			:game="game"
		/>
	</loadingcontext>
</template>