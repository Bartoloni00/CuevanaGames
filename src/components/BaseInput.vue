<!-- <script>
export default {
    name: 'BaseInput',
    props: {
        modelValue: {
            type: String,
        },
    },
    emits: ['update:modelValue']
}
</script> -->

<script setup>
// si el defineProps necesitamos usarlo en la etiqueta script
// convendra asignarle ese valor a una constante
    defineProps({
        modelValue: {
            type: String,
        },
    })
// Definimos los emits:
defineEmits(['update:modelValue'])
</script>
<template>
    <input
        class="w-full py-1.5 px-2 border border-yellow-900 rounded mb-3 disabled:bg-slate-400"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>