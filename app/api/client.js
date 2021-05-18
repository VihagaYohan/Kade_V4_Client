import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://kade-backend.herokuapp.com/',
})

export default apiClient;