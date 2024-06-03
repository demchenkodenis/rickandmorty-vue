<template>
  <section class="filter">
    <form @submit.prevent="handleFilter">
      <button v-if="name || status" @click="handleFilterReset">Очистить фильтр</button>
      <input
        type="search"
        v-model="name"
        @keypress.enter="() => setSeatchParams()"
        placeholder="Введите имя"
      />
      <select v-model="status" @change="handleChangeStatus">
        <option value="" disabled>Выберите статус</option>
        <option v-for="status in statuses" :key="status" :value="status.toLowerCase()">
          {{ status }}
        </option>
      </select>
      <button type="submit" :disabled="!name && !status">Применить</button>
    </form>
  </section>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
  statuses: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['filter-applied', 'filter-reset', 'filter-status-change'])

const name = ref('')
const status = ref('')

const setParams = () => {
  let params = ''
  if (name.value) {
    params += `name=${name.value.toLowerCase()}`
  }
  if (status.value) {
    if (params) {
      params += `&status=${status.value}`
    } else {
      params += `status=${status.value}`
    }
  }

  return params
}
//формируем параметры для фильтра взависимости от заполненных полей и отдаем родителю
const handleFilter = () => {
  emit('update:currentPage', 1)
  emit('filter-applied', { params: setParams() })
}

const handleChangeStatus = () => {
  emit('filter-status-change', { params: setParams(), curPage: 1 })
}

const handleFilterReset = () => {
  name.value = ''
  status.value = ''
  emit('filter-reset')
}
</script>
<style lang="scss" scoped>
.filter {
  margin: 20px 0;

  form {
    display: flex;
    justify-content: end;
    gap: 20px;

    input,
    select {
      padding: 12px;
      border-radius: 6px;
      border-width: 0;
      &:focus-visible {
        outline: none;
      }
    }

    button {
      border-radius: 6px;
      padding: 12px;
      border-width: 0;
      cursor: pointer;
      transition: all 0.2s;
    }
  }
}
</style>
