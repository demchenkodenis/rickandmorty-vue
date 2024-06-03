<template>
  <section class="pagination">
    <div class="buttons">
      <button @click="prevPage" :disabled="!prevPageUrl">Назад</button>
      <span>Страница {{ currentPage }} из {{ pagination.pages }}</span>
      <button @click="nextPage" :disabled="!nextPageUrl">Вперед</button>
    </div>
  </section>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  pagination: {
    count: {
      type: Number,
      required: true
    },
    next: {
      type: String,
      required: true
    },
    prev: {
      type: String,
      default: null
    },
    pages: {
      type: Number,
      required: true
    }
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage'])
const prevPageUrl = ref(null)
const nextPageUrl = ref(null)
const page = ref(1)
const prevPage = () => {
  if (prevPageUrl.value) {
    emit('update:currentPage', props.currentPage - 1)
    page.value = props.currentPage - 1
  }
}
const nextPage = () => {
  if (nextPageUrl.value) {
    emit('update:currentPage', props.currentPage + 1)
    page.value = props.currentPage + 1
  }
}

watch(
  () => props.pagination,
  () => {
    prevPageUrl.value = props.pagination.prev
    nextPageUrl.value = props.pagination.next
  },
  {
    immediate: true
  }
)

watch(page, (page) => {
  if (page > props.pagination.pages) {
    return alert('Не верный номер страницы')
  }
  emit('update:currentPage', page)
})
</script>
<style scoped>
.pagination {
  max-width: 400px;
  margin: 20px auto 0;
  background-color: var(--vt-c-white);
  padding: 10px;
  border-radius: 8px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
button {
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
input {
  max-width: 48px;
  text-align: center;
}
</style>
