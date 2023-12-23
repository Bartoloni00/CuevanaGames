<script setup>
import LoginForm from '../components/LoginForm.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';
const emit = defineEmits(['login',])
// defino este elemento login
// el cual recibo de app y luego se los dapo a loginForm

</script>
<template>
  <PrincipalTitle class="text-center">Inicio de sesion</PrincipalTitle>
  <LoginForm />
</template>