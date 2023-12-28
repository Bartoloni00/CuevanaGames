<script setup>
import PhotoDefault from './PhotoDefault.vue';
import BaseButton from './BaseButton.vue';
import PrincipalTitle from './PrincipalTitle.vue';
import { useAuth } from '../composition/useAuth';
import { addItemToCard } from '../services/cart';
import { inject } from 'vue';

const {notification, setNotifications} = inject('notification')

const {user} = useAuth()

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

function handleAddToCart(){
	addItemToCard(user.value.id,{
		gameId: props.game.id,
		title: props.game.title,
		price: props.game.price,
		photoURL: props.game.photoURL
	})
	.then(()=>{
		setNotifications({
        message: `${props.game.title} fue agregado al carrito`,
        type: 'success',
    })
	})
	.catch(error=>{
		setNotifications({
        message: error,
        type: 'error',
    })
	})
}
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
			<p class="text-lg font-bold text-slate-500 mb-4 flex gap-1">
				<img src="/icons/price.svg" alt="icono del precio">
				<b>${{ game.price }}</b>
			</p>

			<form action="#" class="flex items-center" v-if="addToCar" @submit.prevent="handleAddToCart">
				<BaseButton class="max-w-[150px]" color="gray">Agregar al carrito</BaseButton>
			</form>
        </div>
	</section>
</template>