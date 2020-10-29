import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/calendar'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (objectToAdd) => {
  const response = await axios.post(baseUrl, objectToAdd)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default {getAll, addNew, remove}