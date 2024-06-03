<template>
  <div class="avatar">
    <img :src="src" :alt="alt" />
  </div>
</template>
<script setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>
<style lang="scss" scoped>
.avatar {
  flex: 2 1 0%;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .avatar {
    img {
      max-width: 100%;
      height: 200px;
    }
  }
}
</style>
