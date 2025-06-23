import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import { chatApi } from './services/chatApi'

export const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware),
})

setupListeners(store.dispatch)

export default store
