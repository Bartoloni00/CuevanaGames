<script setup>
import LinkButton from '@/components/LinkButton.vue';


</script>
<template>
    <section className=" h-[85vh] flex items-center mt-[5vh]">
        <div className="mx-auto w-full text-center">
            <div className="px-6">
            <h1 className="text-8l uppercase mb-3 text-7xl font-bold">
                Cuevana Games
            </h1>
            <p className="text-xl my-[5%]">
                Tu próximo juego favorito al precio más barato del mercado
            </p>
            <LinkButton url="/tienda">
                Descubrir juegos
            </LinkButton>
            </div>
        </div>
    </section>
</template>