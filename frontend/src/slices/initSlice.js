import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setMessages } from './messagesSlice'
import fetchInitialData from '../services/api'
export const initApp = createAsyncThunk(
  'init/initApp',
  async (_, { getState, dispatch }) => {
    const { token } = getState().auth
    const response = await fetchInitialData(token)
    const { channels, messages } = response.data
    dispatch(setMessages(messages))
    return {
      channels,
      currentChannelId: response.data.currentChannelId ?? channels[0]?.id ?? null,
    }
  },
)
const initSlice = createSlice({
  name: 'init',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initApp.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(initApp.fulfilled, state => {
        state.loading = false
      })
      .addCase(initApp.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to initialize app'
      })
  },
})
export default initSlice.reducer
