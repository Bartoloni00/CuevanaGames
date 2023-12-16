<!-- <script>
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
</script> -->
<script setup>
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseLabel from './BaseLabel.vue'
import { login } from '../services/auth.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

// capturamos el router usando la funcion de composicion:
// useRouter de Vue Router.
    const router = useRouter()

const processingLogin = ref(false)
const form = ref({
    email:'',
    password:'',
})

// Para los metodos:
const handleLogin = async () => {
   try {
    if(processingLogin.value) return ;

    processingLogin.value = true;

    await login({...form.value,});
    processingLogin.value = false;
    await Promise.resolve()
    // Redireccionamos al perfil.
    router.push({ path: '/perfil' }) // funciona con un doble click...
   } catch (error) {
    // TODO: MANEJAR EL ERROR
   }
}
</script>
<template>
     <form action="#" class="max-w-[520px] m-auto" @submit.prevent="handleLogin">
        <div>
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput 
                type="email"
                id="email"
                :disable="processingLogin"
                v-model="form.email"
            />
        </div>
        <div>
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                :disable="processingLogin"
                v-model="form.password "/>
        </div>
        <BaseButton :loading="processingLogin">Ingresar</BaseButton>
    </form>
</template>