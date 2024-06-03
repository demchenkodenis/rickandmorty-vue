<template>
  <header>
    <Header title="Рик и Морти" />
  </header>
  <main>
    <CardList />
  </main>
</template>
<script setup>
import Header from './components/Header.vue'
import CardList from './components/Card/CardList.vue'
</script>
<style scoped>
header {
  line-height: 1.5;
}
</style>
