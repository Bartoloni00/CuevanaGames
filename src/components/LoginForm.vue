<script>
// version previa a composition api
/*
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseLabel from './BaseLabel.vue'

import { login } from '../services/auth.js'

export default {
    name: 'LoginForm',
    components: {BaseButton, BaseLabel, BaseInput},
    data() {
        return {
            processingLogin: false,
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        handleLogin() {
            if(this.processingLogin) return 
            this.processingLogin = true
            // console.log('ejecutando el login:', this.form);
            login({...this.form})
            .then(() => {
                // Redireccionamos al perfil.
                this.$router.push({path: '/perfil'})
            })
        },
    }
}
*/
</script>
<script setup>
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseLabel from './BaseLabel.vue'
import { login } from '@/services/auth.js'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router';
import {useEyeFunction} from '@/composition/useEyeFunction.js'

const {
    processingLogin,
    form,
    feedback,
    handleLogin
} = useLogin()

const {
    passwordInputType,
    handleEye,
    iconEye
} = useEyeFunction()

// injectamos la notificacion provista por app.
const {notification, setNotifications} = inject('notification')

function useLogin() {
    
// capturamos el router usando la funcion de composicion:
// useRouter de Vue Router.
const router = useRouter()

const processingLogin = ref(false)
const form = ref({
    email:'',
    password:'',
})
const feedback = ref({
    message: null,
    type: 'success',
})
// Para los metodos:
const handleLogin = async () => {
   try {
    if(processingLogin.value) return ;

    processingLogin.value = true;

    await login({...form.value,});
    processingLogin.value = false;
    await Promise.resolve()

    // le damos el valor a app
    setNotifications({
        message: 'Bienvenido nuevamente a CuevanaGames',
        type: 'success',
    })
    // Redireccionamos al perfil.
    router.push({ path: '/perfil' }) // funciona con un doble click...
   } catch (error) {
    feedback.value = {
        message: error,
        type: 'error'
    }
    processingLogin.value = false;
   }
}
return {
    processingLogin,
    form,
    feedback,
    handleLogin
}
}

</script>
<template>
     <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleLogin">
        <div>
            <BaseLabel for="email" class="flex gap-1">
                <img src="/icons/email.svg" alt="icono de email">
                Email
            </BaseLabel>
            <BaseInput 
                type="email"
                id="email"
                :disable="processingLogin"
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
                :disable="processingLogin"
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
        <BaseButton :loading="processingLogin" class="flex gap-1 justify-center">
            Ingresar
            <img src="/icons/login_white.svg" alt="icono de login">
        </BaseButton>
    </form>
</template>