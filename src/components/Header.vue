<template>
  <h1>
    <a href="/">{{ title }}</a>
  </h1>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<style scoped>
h1 {
  text-align: center;
  a {
    font-weight: bold;
    font-size: 48px;

    color: var(--vt-c-white);
  }
}
</style>
