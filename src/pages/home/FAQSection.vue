<script setup>
import FAQCard from '../../components/FAQCard.vue';

</script>
<template>
<section class="space-y-4">
    <h2 class="text-4xl text-center mt-[5vh]">Preguntas frecuentes</h2>
  <div class="flex flex-col gap-3">
    <FAQCard
        :title="'¿Cuáles son las opciones de pago disponibles en la tienda?'"
        :description="'Aceptamos tarjetas de crédito/débito principales, PayPal y transferencias bancarias para brindarte opciones seguras y convenientes.'"
    />
    <FAQCard
        :title="'¿Cómo se realiza el proceso de envío y cuánto tiempo demora?'"
        :description="' Enviamos a través de servicios de mensajería confiables. El tiempo de entrega varía según la ubicación, pero generalmente oscila entre 3 y 7 días hábiles.'"
    />
    <FAQCard
        :title="'¿Puedo devolver o cambiar un producto si no estoy satisfecho?'"
        :description="'Sí, ofrecemos una política de devolución flexible. Si no estás satisfecho con tu compra, puedes devolver o cambiar el producto en un plazo de 14 días desde la recepción.'"
    />
    <FAQCard
        :title="'¿Cómo puedo obtener soporte técnico si tengo problemas con un juego o hardware?'"
        :description="'Contamos con un equipo de soporte técnico disponible las 24 horas a través de nuestro chat en vivo y correo electrónico. ¡Estamos aquí para ayudarte con cualquier problema que puedas tener!'"
    />
  </div>
</section>
</template>