import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const stored =
      localStorage.getItem('foodfacts-saved') ??
      localStorage.getItem('savedProducts')
    const parsed = stored ? JSON.parse(stored) : []

    return Array.isArray(parsed)
      ? parsed.map((item) => ({
          ...item,
          id: item?.id ?? item?.code,
        }))
      : []
  } catch {
    return []
  }
}

const normalizeItem = (item) => ({
  ...item,
  id: item?.id ?? item?.code,
})

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const normalizedItem = normalizeItem(action.payload)
      const exists = state.items.some((item) => item.id === normalizedItem.id)

      if (!exists && normalizedItem.id) {
        state.items.push(normalizedItem)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer
