<script setup>
import AboutSection from './home/AboutSection.vue';
import CategorySection from './home/CategorySection.vue';
import FAQSection from './home/FAQSection.vue';
import HeroSection from './home/HeroSection.vue';

</script>
<template>
  <div class="container mx-auto px-4">
    <HeroSection/>
    <CategorySection/>
    <AboutSection class="mt-[5vh]"/>
    <FAQSection/>
  </div>
</template>
