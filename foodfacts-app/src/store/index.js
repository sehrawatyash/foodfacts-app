import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const saveToStorage = (items) => {
  try {
    localStorage.setItem('foodfacts-saved', JSON.stringify(items))
  } catch {
    // Ignore storage errors.
  }
}

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
})

store.subscribe(() => {
  saveToStorage(store.getState().saved.items)
})

export default store
