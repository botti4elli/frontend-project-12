import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  saveToken,
  saveUsername,
  clearAuthStorage,
  getToken,
  getUsername,
} from '../utils/storage.js'

export const checkAuth = createAsyncThunk('auth/check', async (_, { rejectWithValue }) => {
  const token = getToken()
  const username = getUsername()

  if (!token) {
    return rejectWithValue('No token found')
  }

  try {
    await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return { username, token }
  }
  catch {
    return rejectWithValue('Invalid or expired token')
  }
})

const initialState = {
  username: getUsername() || null,
  token: getToken() || null,
  status: 'idle',
  error: null,
  authChecked: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null
      state.token = null
      state.status = 'idle'
      state.error = null
      state.authChecked = true
      clearAuthStorage()
    },
    setCredentials: (state, action) => {
      const { username, token } = action.payload
      state.username = username
      state.token = token
      state.status = 'succeeded'
      state.error = null
      saveToken(token)
      saveUsername(username)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        const { username, token } = action.payload
        state.status = 'succeeded'
        state.authChecked = true
        state.username = username
        state.token = token
        state.error = null
        saveToken(token)
        saveUsername(username)
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed'
        state.authChecked = true
        state.error = action.payload || action.error.message || 'Authorization failed'
        state.username = null
        state.token = null
        clearAuthStorage()
      })
  },
})

export const { logout, setCredentials } = authSlice.actions

export const selectUsername = state => state.auth.username
export const selectToken = state => state.auth.token
export const selectCurrentUser = state => state.auth

export const selectIsAuthChecked = state => state.auth.authChecked

export default authSlice.reducer
