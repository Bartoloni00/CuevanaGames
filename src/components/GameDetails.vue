<script setup>
import PhotoDefault from './PhotoDefault.vue';

    const props = defineProps({
        game: {
            type: Object,
            required: true,
        },
        addToCar: {
            type:Boolean,
            default: true,
        }
    })
</script>
<template>
    <div class="flex bg-white p-8 rounded shadow-md ">
		<div class="w-4/12">
			<PhotoDefault 
				:element="game"
			/>
		</div>
		<div class="w-8/12 ml-6">
			<h2 class="text-3xl font-semibold mb-4">{{ game.title }}</h2>
			<p class="text-gray-600 mb-6">{{ game.description }}</p>
			<div class="text-lg font-bold text-blue-500 mb-4">Precio: ${{ game.price }}</div>

			<div class="flex items-center" v-if="addToCar">
				<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Agregar al carrito</button>
			</div>
        </div>
	</div>
</template>