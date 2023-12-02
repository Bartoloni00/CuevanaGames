<script>
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseLabel from './BaseLabel.vue'

import { login } from '../services/auth.js'

export default {
    name: 'LoginForm',
    components: {BaseButton, BaseLabel, BaseInput},
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
                // Redireccionamos al perfil.
                this.$router.push({path: '/perfil'})
            })
        },
    }
}
</script>

<template>
     <form action="#" class="max-w-[520px]" @submit.prevent="handleLogin">
        <div>
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput 
                type="email"
                id="email"
                v-model="form.email"
            />
        </div>
        <div>
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                v-model="form.password "/>
        </div>
        <BaseButton>Ingresar</BaseButton>
    </form>
</template>