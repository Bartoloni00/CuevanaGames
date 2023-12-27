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
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
        <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
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
            <p class="text-sm text-gray-500 my-2 text-center">
                ¿Ya tienes cuenta?
                <router-link class="underline" to="/login">¡Inicia sesion!</router-link>
            </p>
        </div>
        <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            <img
                alt="Register"
                src="https://cdn.leonardo.ai/users/dafbc6e9-6bad-48a3-b535-813e6af0f425/generations/d5569fcc-7a79-4c87-ac18-24433649bcc9/3D_Animation_Style_an_iconic_video_game_character_Forging_the_2.jpg"
                class="absolute inset-0 h-full w-full object-cover"
            />
        </div>
    </section>
</template>