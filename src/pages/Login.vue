<script setup>
import LoginForm from '../components/LoginForm.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';
const emit = defineEmits(['login',])
// defino este elemento login
// el cual recibo de app y luego se los dapo a loginForm

</script>
<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <PrincipalTitle class="text-center">Inicio de sesion</PrincipalTitle>
      <p></p>
      <LoginForm />
      <p class="text-sm text-gray-500 my-2 text-center">
          ¿No tienes cuenta?
          <router-link class="underline" to="/registrarse">¡Registrate!</router-link>
      </p>
    </div>
    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt="Welcome"
        src="https://cdn.leonardo.ai/users/dafbc6e9-6bad-48a3-b535-813e6af0f425/generations/852413a7-b5eb-4d71-883d-6e0acd7d3a37/DreamShaper_v7_Kratos_welcoming_to_the_olimpus_2.jpg"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </section>
</template>