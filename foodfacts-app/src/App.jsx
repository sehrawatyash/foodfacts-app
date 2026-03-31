import { useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailedPage'
import SavedPage from './pages/SavedPage'

function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const alreadySaved = state.some((item) => item.code === action.product.code)
      return alreadySaved ? state : [...state, action.product]
    }

    case 'REMOVE':
      return state.filter((item) => item.code !== action.code)

    default:
      return state
  }
}

function App() {
  const [saved, dispatch] = useReducer(savedReducer, [])

  return (
    <div>
      <NavBar savedCount={saved.length} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:barcode"
            element={<DetailPage saved={saved} dispatch={dispatch} />}
          />
          <Route
            path="/saved"
            element={<SavedPage saved={saved} dispatch={dispatch} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App