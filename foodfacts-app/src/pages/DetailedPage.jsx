import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (!cancelled) {
          if (response.data.status !== 1 || !response.data.product) {
            setProduct(null)
          } else {
            setProduct(response.data.product)
          }
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err)

        if (!cancelled) {
          setError('Could not load product details.')
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const isSaved = saved.some((p) => p.code === barcode)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch({ type: 'REMOVE', code: barcode })
    } else if (product) {
      dispatch({ type: 'ADD', product })
    }
  }

  if (loading) return <p>Loading product details...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Product not found.</p>

  const nutriments = product.nutriments || {}
  const nutritionItems = [
    { label: 'Calories', value: `${nutriments['energy-kcal_100g'] ?? 'N/A'} kcal` },
    { label: 'Protein', value: `${nutriments.proteins_100g ?? 'N/A'} g` },
    { label: 'Carbs', value: `${nutriments.carbohydrates_100g ?? 'N/A'} g` },
    { label: 'Fat', value: `${nutriments.fat_100g ?? 'N/A'} g` },
  ]

  return (
    <div className="detail-page">
      <button onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        {(product.image_small_url || product.image_front_small_url) && (
          <img
            src={product.image_small_url || product.image_front_small_url}
            alt={product.product_name || 'Food product'}
            className="food-image"
          />
        )}

        <div>
          <h2>{product.product_name || 'Unnamed product'}</h2>
          <p>{product.brands || 'Unknown brand'}</p>
        </div>
      </div>

      <div className="nutrition-table">
        <h3>Nutrition per 100g</h3>
        <ul>
          {nutritionItems.map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSaveToggle}>
        {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
      </button>
    </div>
  )
}

export default DetailPage
