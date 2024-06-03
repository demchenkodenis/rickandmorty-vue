<template>
  <CharacterFilter
    :statuses="statuses"
    @filter-applied="handleFilterApplied"
    @filter-reset="handleFilterReset"
    @filter-status-change="handleFilterStatusChange"
  />
  <section class="character-cards">
    <CardItem :card="card" v-for="card in cards" :key="card.id" />
  </section>
  <Pagination :pagination="info" v-model:currentPage="currentPage" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getCharacters, getEpisodes, getCharactersFilter } from '../../utils/getData'
import CardItem from './CardItem.vue'
import Pagination from '../Pagination/Pagination.vue'
import CharacterFilter from '../Filter/CharacterFilter.vue'

//карточки персонажей
const cards = ref([])
//информация о пагинации
const info = ref({})
//текущая страница, по умолчанию первая
const currentPage = ref(1)
//статусы фильтра
const statuses = ['Alive', 'Dead', 'Unknown']
//url фильтра с параметрами
const filterUrl = ref(null)

//получим всех персонажей, определим дополнительное поле для дальнейшего переназначения. Присвоим данные о пагинации
const fetchCharacters = async (url) => {
  const characters = await getCharacters(url)
  info.value = characters.info
  return characters.results.map((character) => ({
    ...character,
    first_seen: null
  }))
}

//получим все id первых эпизодов персонажей, в которых они появлялись
const episodeId = (characters) => {
  return characters.map((character) => {
    const episodeId = character.episode[0].split('/')[5]
    return episodeId
  })
}

//получим эти эпизоды и сделаем карту, для быстрого поиска эпизода
const fetchEpisodes = async (episodeIds) => {
  const episodes = await getEpisodes(episodeIds)
  // преобразуем ответ в массив, если необходимо
  const episodesArray = Array.isArray(episodes) ? episodes : [episodes]
  const episodeMap = new Map()
  episodesArray.forEach((episode) => episodeMap.set(episode.id, episode.name))
  return episodeMap
}

//переопределим поле свойство first_seen, после того как получили названия эпизодов и вернем новый объект
const setFirstSeen = (characters, episodeMap) => {
  characters.forEach((character) => {
    const episodeId = character.episode[0].split('/')[5]
    character.first_seen = episodeMap.get(Number(episodeId))
  })
  return characters
}

//получим данные
const fetchData = async (url) => {
  const characters = await fetchCharacters(url)
  const episodeIds = episodeId(characters)
  const episodeMap = await fetchEpisodes([...new Set(episodeIds)])
  setFirstSeen(characters, episodeMap)
  cards.value = characters
}

//получим отфильтрованные данные
const filterParams = async ({ params }) => {
  filterUrl.value = `page=${currentPage.value}&${params}`
  const filteredCharacters = await getCharactersFilter(filterUrl.value)
  info.value = filteredCharacters.info
  const episodeIds = episodeId(filteredCharacters.results)
  const episodeMap = await fetchEpisodes([...new Set(episodeIds)])
  setFirstSeen(filteredCharacters.results, episodeMap)
  cards.value = filteredCharacters.results
}

//применение фильтра
const handleFilterApplied = ({ params }) => {
  if (params) {
    filterParams({ params })
  } else {
    fetchData(currentPage.value)
  }
}
//изменение параметра статуса
const handleFilterStatusChange = ({ curPage }) => {
  currentPage.value = curPage
}
//сброс фильтра
const handleFilterReset = () => {
  currentPage.value = 1
  fetchData()
}

onMounted(() => fetchData())

watch(currentPage, async (newPage, oldPage) => {
  if (currentPage.value === 1) return
  if (newPage > oldPage) {
    fetchData(info.value.next)
  } else {
    fetchData(info.value.prev)
  }
})
</script>

<style scoped>
.character-cards {
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 16px;
}
</style>
