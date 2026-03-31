import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

function NutritionRow({ label, value, unit }) {
  if (value === undefined || value === null) return null

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {typeof value === 'number' ? value.toFixed(1) : value}
          {unit}
        </Typography>
      </Box>
      <Divider />
    </>
  )
}

export default NutritionRow
