<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'
import BaseInput from '../components/BaseInput.vue'
import PrincipalTitle from '../components/PrincipalTitle.vue'
import {register} from '../services/auth.js'
import {ref} from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const processingRegister = ref(false)
const form = ref({
    email: '',
    password: '',
})

const handleSubmit = async () => {
    try {
        if(processingRegister.value) return;
            processingRegister.value = true
            register({...form.value})
            .then(()=>{
                form.email = ''
                form.password = ''
                processingRegister.value = false
                router.push({ path: '/perfil' })
            })
    } catch (error) {
        
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
        <BaseButton :loading="processingRegister">Registrarse</BaseButton>
    </form>
</template>