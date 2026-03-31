import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BookmarkIcon from '@mui/icons-material/Bookmark'

function NavBar() {
  const savedCount = useSelector((state) => state.saved.items.length)

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={800}>
          🥗 FoodFacts
        </Typography>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button color="inherit" component={NavLink} to="/">
            Search
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/saved"
            startIcon={
              <Badge badgeContent={savedCount} color="secondary">
                <BookmarkIcon />
              </Badge>
            }
          >
            Saved
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
