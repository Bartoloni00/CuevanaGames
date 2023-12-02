<script>
export default {
    name: 'BaseInput',
    props: {
        modelValue: {
            type: String,
        },
    },
    emits: ['update:modelValue']
}
</script>

<template>
    <input
        class="w-full py-1.5 px-2 border border-yellow-900 rounded mb-3"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>