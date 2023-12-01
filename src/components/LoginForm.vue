<script>
import BaseLabel from './BaseLabel.vue'
import BaseButton from './BaseButton.vue'
import { login } from '../services/auth.js'

export default {
    name: 'LoginForm',
    components: {BaseButton, BaseLabel},
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        handleLogin() {
            // console.log('ejecutando el login:', this.form);
            login({...this.form})
            .then(user => {
            })
        },
    }
}
</script>

<template>
     <form action="#" class="max-w-[520px]" @submit.prevent="handleLogin">
        <div>
            <BaseLabel>Email</BaseLabel>
            <input 
                class="border border-yellow-900 w-full"
                type="email" 
                id="email"
                v-model="form.email">
        </div>
        <div>
            <BaseLabel>Contraseña</BaseLabel>
            <input 
                class="border border-yellow-900 w-full"
                type="password" 
                id="password"
                v-model="form.password ">
        </div>
        <BaseButton>Ingresar</BaseButton>
    </form>
</template>