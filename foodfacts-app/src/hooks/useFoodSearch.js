import { useState } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchFood = async (query) => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const url = 'https://world.openfoodfacts.org/cgi/search.pl'
      const response = await axios.get(url, {
        params: {
          search_terms: trimmedQuery,
          json: 1,
          page_size: 10,
        },
      })

      const filtered = (response.data.products || []).filter(
        (product) => product.product_name?.trim()
      )

      setResults(filtered)
    } catch (err) {
      console.error('Something went wrong:', err)

      if (err.response) {
        setError(`Server error: ${err.response.status}. Please try again.`)
      } else if (err.request) {
        setError('Network error. Check your connection and try again.')
      } else {
        setError('Something went wrong. Please try again.')
      }

      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch
