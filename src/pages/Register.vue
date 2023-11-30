<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'

export default {
    name: 'Register',
    components: { BaseButton,BaseLabel }
}
</script>

<template>
    <h1 class="mb-4">Register</h1>
    <form action="#" class="max-w-[520px]">
        <div>
            <BaseLabel>Email</BaseLabel>
            <input 
                class="border border-yellow-900 w-full"
                type="email" 
                id="email">
        </div>
        <div>
            <BaseLabel>Contraseña</BaseLabel>
            <input 
                class="border border-yellow-900 w-full"
                type="password" 
                id="password">
        </div>
        <BaseButton>Registrarse</BaseButton>
    </form>
</template>