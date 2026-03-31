import { createContext, useContext, useEffect, useReducer } from 'react'

const SavedContext = createContext(null)

function savedReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const product = action.payload
      const isAlreadySaved = state.some((item) => item.code === product.code)

      if (isAlreadySaved) {
        return state
      }

      return [...state, product]
    }

    case 'REMOVE':
      return state.filter((item) => item.code !== action.payload)

    default:
      return state
  }
}

function SavedProvider({ children }) {
  const [savedItems, dispatch] = useReducer(savedReducer, [], () => {
    const storedItems = localStorage.getItem('savedProducts')
    return storedItems ? JSON.parse(storedItems) : []
  })

  useEffect(() => {
    localStorage.setItem('savedProducts', JSON.stringify(savedItems))
  }, [savedItems])

  return (
    <SavedContext.Provider value={{ savedItems, dispatch }}>
      {children}
    </SavedContext.Provider>
  )
}

function useSaved() {
  const context = useContext(SavedContext)

  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider')
  }

  return context
}

export { SavedProvider, useSaved, savedReducer }
