<script>
import LoginForm from '../components/LoginForm.vue';
import PrincipalTitle from '../components/PrincipalTitle.vue';
export default {
  name: 'Login',
  components: { LoginForm, PrincipalTitle },
}
</script>

<template>
  <PrincipalTitle>Inicio de sesion</PrincipalTitle>
  <LoginForm/>
</template>