<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'
import BaseInput from '../components/BaseInput.vue'
import PrincipalTitle from '../components/PrincipalTitle.vue'
import {register} from '../services/auth.js'

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput,PrincipalTitle },
    data(){
        return {
            processingLogin: false,
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        handleSubmit() {
            if(this.processingLogin) return;
            this.processingLogin = true
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
    <PrincipalTitle>Registrate</PrincipalTitle>
    <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleSubmit">
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
        <BaseButton :loading="processingLogin">Registrarse</BaseButton>
    </form>
</template>