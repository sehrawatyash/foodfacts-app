import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom'

function FoodCard({ product }) {
  const navigate = useNavigate()
  const productId = product.id ?? product.code

  const handleClick = () => {
    if (productId) {
      navigate(`/product/${productId}`, { state: { product } })
    }
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        {product.image_small_url && (
          <CardMedia
            component="img"
            height="140"
            image={product.image_small_url}
            alt={product.product_name || 'Food product'}
            sx={{ objectFit: 'contain', p: 1 }}
          />
        )}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {product.product_name || 'Unknown Product'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {product.brands || 'Unknown Brand'}
          </Typography>
          {product.nutriments?.['energy-kcal_100g'] && (
            <Chip
              label={`${Math.round(product.nutriments['energy-kcal_100g'])} kcal / 100g`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FoodCard
