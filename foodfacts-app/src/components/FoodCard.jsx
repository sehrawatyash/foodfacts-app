function FoodCard({ product }) {
  const { product_name, brands, nutriments = {}, image_small_url } = product

  const calories = nutriments['energy-kcal_100g'] ?? 'N/A'
  const protein = nutriments.proteins_100g ?? 'N/A'
  const carbs = nutriments.carbohydrates_100g ?? 'N/A'
  const fat = nutriments.fat_100g ?? 'N/A'

  return (
    <div className="food-card">
      {image_small_url && (
        <img
          src={image_small_url}
          alt={product_name || 'Food product'}
          className="food-image"
        />
      )}

      <h3>{product_name || 'Unnamed product'}</h3>
      <p>
        <strong>Brand:</strong> {brands || 'Unknown'}
      </p>

      <div className="nutrition-info">
        <p>
          <strong>Calories:</strong> {calories} kcal
        </p>
        <p>
          <strong>Protein:</strong> {protein} g
        </p>
        <p>
          <strong>Carbs:</strong> {carbs} g
        </p>
        <p>
          <strong>Fat:</strong> {fat} g
        </p>
      </div>
    </div>
  )
}

export default FoodCard
