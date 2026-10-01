import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

export async function getProducts() {
  const response = await axios.get(
    `${API_BASE_URL}/products`
  )

  return response.data
}

export async function getProductBySlug(slug) {
  const response = await axios.get(
    `${API_BASE_URL}/products/${slug}`
  )

  return response.data
}