import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export async function submitQuote(quoteData) {
  const response = await axios.post(
    `${API_BASE_URL}/quotes`,
    quoteData
  )

  return response.data
}