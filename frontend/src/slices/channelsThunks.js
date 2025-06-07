import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
// Добавление канала
export const addChannelThunk = createAsyncThunk(
  'channels/addChannel',
  async ({ name }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.post(
        '/api/v1/channels',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data // новый канал
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to add channel')
    }
  },
)
// Удаление канала
export const removeChannelThunk = createAsyncThunk(
  'channels/removeChannel',
  async (channelId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return channelId // возвращаем id удаленного канала
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to remove channel')
    }
  },
)
// Переименование канала
export const renameChannelThunk = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.patch(
        `/api/v1/channels/${id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      return response.data // обновлённый канал
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to rename channel')
    }
  },
)
