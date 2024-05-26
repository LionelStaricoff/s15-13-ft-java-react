import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_STATE = []

const initialState = (() => {
  const persistedState = window.sessionStorage.getItem('session__state')
  return persistedState ? JSON.parse(persistedState).purchases : DEFAULT_STATE
})()

export const purchasesSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    initPurchases: (state, action) => {
      return [...state, ...action.payload]
    },
    addPurchase: (state, action) => {
      return [...state, { ...action.payload }]
    },
    updateProductById: (state, action) => {
      const { id, newData } = action.payload
      return state.map(purchase => (purchase.id === id ? { ...purchase, ...newData } : purchase))
    },
    deletePurchaseById: (state, action) => {
      return state.filter(purchase => purchase.id !== action.payload)
    },
    resetPurchases: (state, action) => {
      return DEFAULT_STATE
    }
  }
})

export default purchasesSlice.reducer
export const {
  initPurchases,
  addPurchase,
  updateProductById,
  deletePurchaseById,
  resetPurchases
} = purchasesSlice.actions
