<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import CartItem from '@/components/CartItem.vue';
import PrincipalTitle from '@/components/PrincipalTitle.vue';
import LoadingContext from '@/components/LoadingContext.vue';
import { useAuth } from "@/composition/useAuth.js";

import {getItemsFromCart} from '@/services/cart.js'

const {user, loadingUser} = useAuth()

const {
  loadingCart,
  items,
  subTotal,
} = useCart(user)

function useCart(user){
  const loadingCart = ref(true)
  const items = ref([])
  const subTotal = ref(0)

  let cartUnsubscribe = ()=>{}
  onMounted(async ()=>{
      loadingCart.value = true
      cartUnsubscribe.value = getItemsFromCart(user.value.id,carrito => {
                        items.value = carrito
                        items.value.forEach(item => {
                          subTotal.value += parseFloat(item.price)
                        })
                      })
                      .catch(error => {
                          console.log('[getCart | Cart.vue]', error)
                      })
      loadingCart.value = false
})
onUnmounted(()=>cartUnsubscribe())

return {
  loadingCart,
  items,
  subTotal,
}
}
</script>
<template>
<section>
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div class="mx-auto max-w-3xl">
      <header class="text-center">
        <PrincipalTitle class="text-center">Tu carrito</PrincipalTitle>
      </header>
      <LoadingContext :loading="loadingCart">
        <div class="mt-8">
        <ul v-for="item in items" class="space-y-4">
            <CartItem
                :title="item.title"
                :gameId="item.gameId"
                :price="item.price"
                :image="item.photoURL"
                :user-id="user.id"
                class="my-1"
            />
        </ul>

        <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
          <div class="w-screen max-w-lg space-y-4">
            <dl class="space-y-0.5 text-sm text-gray-700">
              <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd>$ {{ subTotal }}</dd>
              </div>

              <div class="flex justify-between">
                <dt>Impuestos</dt>
                <dd>$ {{ subTotal * 0.21 }}</dd>
              </div>

              <div class="flex justify-between">
                <dt>Descuentos</dt>
                <dd>-$ {{ subTotal * 0.21 }}</dd>
              </div>

              <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>$ {{ subTotal }}</dd>
              </div>
            </dl>

            <div class="flex justify-end">
              <span
                class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>

                <p class="whitespace-nowrap text-xs">2 Descuentos Aplicados</p>
              </span>
            </div>

            <div class="flex justify-end">
              <a
                href="#"
                class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Comprar
              </a>
            </div>
          </div>
        </div>
      </div>
      </LoadingContext>
    </div>
  </div>
</section>
</template>