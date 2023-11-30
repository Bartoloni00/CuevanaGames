<script>
export default {
    name: 'App',
}
</script>
<template>
    <header class="flex gap-8 p-4 items-center bg-yellow-900 justify-between py-6">
        <span class="text-xl">CuevanaGames</span>
        <nav>
            <ul class="flex gap-4">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/chat">Chat</router-link></li>
                <li><router-link to="/quienes-somos">Quienes somos</router-link></li>
            </ul>
        </nav>
        <nav>
            <ul class="flex gap-4">
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/registrarse">Registrarse</router-link></li>
            </ul>
        </nav>
    </header>
    <main class="container p-4 m-auto h-full">
        <router-view></router-view>
    </main>
    <footer class="bg-yellow-900 flex justify-center items-center">
        <p>Bartoloni Abraham</p>
    </footer>
</template>