<!-- <script>
export default {
    name: 'BaseLabel',
}
</script> -->
<!-- <script setup>
// No necesito ponerle un nombre
// el nombre del archivo sera el por defecto
</script> -->
<!-- Como vemos con la api de composicion la etiqueta script es opcional -->
<template>
    <label><slot>Nombre</slot>:</label>
</template>