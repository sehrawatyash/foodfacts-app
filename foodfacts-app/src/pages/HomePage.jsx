import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import SearchBar from '../components/SearchBar'
import FoodCard from '../components/FoodCard'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={800}>
        Search Nutrition Info
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Type any food name to see its nutrition facts.
      </Typography>

      <SearchBar onSearch={searchFood} />

      {error && <ErrorMessage message={error} />}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {!loading && results.length === 0 && !error && (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Search for a food above to see nutrition info.
        </Typography>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {results.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id ?? product.code}>
            <FoodCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomePage
