<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'
import BaseInput from '../components/BaseInput.vue'
import {register} from '../services/auth.js'

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput },
    data(){
        return {
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            register({...this.form})
            .then(()=>{
                this.form.email = ''
                this.form.password = ''
                this.$router.push({path: '/perfil'})
            })
        }
    } 
}
</script>

<template>
    <h1 class="mb-4">Register</h1>
    <form action="#" class="max-w-[520px]" @submit.prevent="handleSubmit">
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
                v-model="form.password"
            />
        </div>
        <BaseButton>Registrarse</BaseButton>
    </form>
</template>