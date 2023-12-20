<script setup>
import BaseLoader from './BaseLoader.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
})
</script>
<template>
    <template v-if="!loading">
        <slot></slot>
    </template>
    <template v-else>
        <div class="flex justify-center items-center w-full">
            <BaseLoader/>
        </div>
    </template>
</template>