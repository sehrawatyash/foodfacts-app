import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NutritionRow from '../components/NutritionRow'
import { addItem, removeItem } from '../store/savedSlice'

function DetailPage() {
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const initialProduct = location.state?.product ?? null

  const [product, setProduct] = useState(initialProduct)
  const [loading, setLoading] = useState(!initialProduct)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    if (initialProduct && (initialProduct.id ?? initialProduct.code) === id) {
      setProduct(initialProduct)
      setLoading(false)

      return () => {
        cancelled = true
      }
    }

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${id}.json`
        )

        if (!cancelled) {
          setProduct(response.data.status === 1 ? response.data.product : null)
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
  }, [id, initialProduct])

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading product details...</Typography>
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>{error}</Typography>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Product not found.</Typography>
        <Button onClick={() => navigate('/')}>← Back to Search</Button>
      </Container>
    )
  }

  const { product_name, brands, image_url, image_small_url, nutriments } = product
  const productId = product.id ?? product.code ?? id
  const isSaved = savedItems.some((p) => (p.id ?? p.code) === productId)

  const handleSaveToggle = () => {
    if (isSaved) {
      dispatch(removeItem(productId))
    } else {
      dispatch(addItem(product))
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
          {(image_url || image_small_url) && (
            <Box
              component="img"
              src={image_url || image_small_url}
              alt={product_name || 'Food product'}
              sx={{ width: 160, height: 160, objectFit: 'contain' }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {product_name || 'Unknown Product'}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {brands || 'Unknown Brand'}
            </Typography>
            <Button
              variant={isSaved ? 'outlined' : 'contained'}
              color={isSaved ? 'error' : 'primary'}
              startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
              onClick={handleSaveToggle}
              sx={{ mt: 1 }}
            >
              {isSaved ? 'Remove from Saved' : 'Save to My List'}
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Nutrition per 100g
        </Typography>

        <NutritionRow
          label="Calories"
          value={nutriments?.['energy-kcal_100g']}
          unit=" kcal"
        />
        <NutritionRow label="Protein" value={nutriments?.proteins_100g} unit="g" />
        <NutritionRow
          label="Carbohydrates"
          value={nutriments?.carbohydrates_100g}
          unit="g"
        />
        <NutritionRow label="Sugars" value={nutriments?.sugars_100g} unit="g" />
        <NutritionRow label="Fat" value={nutriments?.fat_100g} unit="g" />
        <NutritionRow
          label="Saturated Fat"
          value={nutriments?.['saturated-fat_100g']}
          unit="g"
        />
        <NutritionRow label="Fibre" value={nutriments?.fiber_100g} unit="g" />
        <NutritionRow label="Salt" value={nutriments?.salt_100g} unit="g" />
      </Paper>
    </Container>
  )
}

export default DetailPage
