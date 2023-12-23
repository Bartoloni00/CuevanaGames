<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'
import BaseInput from '../components/BaseInput.vue'
import PrincipalTitle from '../components/PrincipalTitle.vue'
import {register} from '../services/auth.js'
import {inject,ref} from 'vue'
import { useRouter } from 'vue-router';

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

const {
        processingRegister,
        form,
        feedback,
        handleSubmit,
    } = useRegister()

function useRegister() {
    const router = useRouter()

    const processingRegister = ref(false)
    const form = ref({
        email: '',
        password: '',
    })
    const feedback = ref({
        message: null,
        type: 'success',
    })
    const handleSubmit = async () => {
        if(processingRegister.value) return;
            processingRegister.value = true
            register({...form.value})
                .then(()=>{
                    form.email = ''
                    form.password = ''
                    processingRegister.value = false

                    setNotifications({
                        message: 'Te has registrado exitosamente',
                        type: 'success'
                    })

                    router.push({ path: '/perfil' })
                })
                .catch(error => {
                    feedback.value = {
                        message: error.message,
                        type: 'error'
                    }
                    processingRegister.value = false
                })
    }
    return {
        processingRegister,
        form,
        feedback,
        handleSubmit,
    }
}
</script>

<template>
    <PrincipalTitle class="text-center">Registrate</PrincipalTitle>
    <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleSubmit">
        <div>
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput 
                type="email"
                id="email"
                :disable="processingRegister"
                v-model="form.email"
            />
        </div>
        <div>
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                :disable="processingRegister"
                v-model="form.password"
            />
        </div>
        <span v-if="feedback.message" class="text-red-600 text-center py-2">
            {{ feedback.message }}
        </span>
        <BaseButton :loading="processingRegister">Registrarse</BaseButton>
    </form>
</template>