<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue'
import BaseInput from '../components/BaseInput.vue'
import PrincipalTitle from '../components/PrincipalTitle.vue'
import {register} from '../services/auth.js'
import {inject,ref} from 'vue'
import { useRouter } from 'vue-router';
import { useEyeFunction } from '../composition/useEyeFunction';

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

const {
        processingRegister,
        form,
        feedback,
        handleSubmit,
    } = useRegister()

const {
    passwordInputType,
    handleEye,
    iconEye,
} = useEyeFunction()
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
            <BaseLabel for="email" class="flex gap-1">
                <img src="/icons/email.svg" alt="icono de email">
                Email
            </BaseLabel>
            <BaseInput 
                type="email"
                id="email"
                :disable="processingRegister"
                v-model="form.email"
            />
        </div>
        <div>
            <BaseLabel for="password" class="flex gap-1">
                <img src="/icons/password.svg" alt="icono de contraseña">
                Contraseña
            </BaseLabel>
            <div class="flex justify-center items-center">
                <BaseInput
                    :type="passwordInputType" 
                    id="password"
                    :disable="processingRegister"
                    v-model="form.password "
                    class="w-11/12"
                    />
                    <div @click="handleEye" class="w-1/12 h-full flex items-center justify-center cursor-pointer px-2">
                        <img :src="iconEye.url" :alt="iconEye.text">
                    </div>
            </div>
        </div>
        <span v-if="feedback.message" class="text-red-600 text-center py-2">
            {{ feedback.message }}
        </span>
        <BaseButton :loading="processingRegister" class="flex gap-1 justify-center">
            Registrarse
            <img src="/icons/register_white.svg" alt="icono de login">
        </BaseButton>
    </form>
</template>