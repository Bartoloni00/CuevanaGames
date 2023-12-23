<script setup>
import PhotoDefault from './PhotoDefault.vue';
import PrincipalTitle from './PrincipalTitle.vue';

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
    <section class="flex bg-white p-8 rounded shadow-md ">
		<picture class="w-4/12">
			<PhotoDefault 
				:element="game"
			/>
		</picture>
		<div class="w-8/12 ml-[15%] max-w-[400px]">
			<PrincipalTitle class="text-3xl font-semibold mb-4">{{ game.title }}</PrincipalTitle>
			<p class="text-gray-600 mb-6">{{ game.description }}</p>
			<p class="text-lg font-bold text-blue-500 mb-4"><span>Precio:</span> <b>${{ game.price }}</b></p>

			<div class="flex items-center" v-if="addToCar">
				<button class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Agregar al carrito</button>
			</div>
        </div>
	</section>
</template>