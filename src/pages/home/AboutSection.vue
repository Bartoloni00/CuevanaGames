<script setup>
import Linkbutton from '../../components/LinkButton.vue';


</script>
<template>
  <section class="flex flex-col justify-between items-center flex-wrap p-4">
    <h2 class="mb-2 text-2xl font-bold text-center text-black">
      Creadores del sitio
    </h2>
    <div class="flex flex-wrap justify-between align-middle gap-4">
      <div
        class="w-72 bg-white  -gray-200 rounded-lg shadow dark:-gray-700"
      >
      <a href="https://github.com/Bartoloni00" target="_blank">
        <img
          class="rounded-t-lg"
          src="https://avatars.githubusercontent.com/u/116020038?v=4"
          alt="Imagen del perfil de Bartoloni00"
        />
      </a>
    <div class="p-5">
      <p class="mb-2 text-lg font-bold tracking-tight text-black">
        Jonathan Abraham Bartoloni
      </p>
      <Linkbutton 
        url="https://github.com/Bartoloni00"
        internalLink="external"
      >
        Visitar perfil de GitHub
        <svg
          class="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
        </svg>
      </Linkbutton>
    </div>
  </div>

  <div
    class="w-72 bg-white  -gray-200 rounded-lg shadow dark:-gray-700"
  >
    <a href="https://github.com/Ezearevalodev" target="_blank">
      <img
        class="rounded-t-lg"
        src="https://avatars.githubusercontent.com/u/111710833?v=4"
        alt="Imagen del perfil Ezearevalodev"
      />
    </a>
    <div class="p-5">
      <p class="mb-2 text-lg font-bold tracking-tight text-black">
        Ezequiel Thomas Arevalo
      </p>
      <Linkbutton 
        url="https://github.com/Ezearevalodev"
        internalLink="external"
      >
        Visitar perfil de GitHub
        <svg
          class="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
        </svg>
      </Linkbutton>    
    </div>
  </div>
  </div>
</section>
</template>