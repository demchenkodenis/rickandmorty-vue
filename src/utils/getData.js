const API_EPISODE = 'https://rickandmortyapi.com/api/episode'
const API_CHARACTER = 'https://rickandmortyapi.com/api/character'

const getCharacters = async (url) => {
  const API_URL = url ? url : API_CHARACTER

  try {
    const response = await fetch(API_URL) // Делаем запрос к API
    if (!response.ok) {
      throw new Error('Данные не найдены')
    }
    const data = await response.json() // декодируем ответ в JSON
    return data // возвращаем данные в формате .json
  } catch (error) {
    // в случае ошибки, показываем ее в консоли
    console.log(`${error}`)
    return error
  }
}

const getEpisodes = async (episodeArr) => {
  try {
    const response = await fetch(`${API_EPISODE}/${episodeArr}`) // Делаем запрос к API
    if (!response.ok) {
      throw new Error('Данные не найдены')
    }
    const data = await response.json() // декодируем ответ в JSON
    return data // возвращаем данные в формате .json
  } catch (error) {
    // в случае ошибки, показываем ее в консоли
    console.log(`${error.message}`)
    return error
  }
}

const getCharactersFilter = async (params) => {
  //формируем url в соответствии с параметрами фильтра
  const url = `${API_CHARACTER}/?${params}`
  try {
    const response = await fetch(url) // Делаем запрос к API
    if (!response.ok) {
      throw new Error('Данные не найдены')
    }
    const data = await response.json() // декодируем ответ в JSON
    return data // возвращаем данные в формате .json
  } catch (error) {
    // в случае ошибки, показываем ее в консоли
    console.log(`${error}`)
    return error
  }
}

export { getCharacters, getEpisodes, getCharactersFilter }
