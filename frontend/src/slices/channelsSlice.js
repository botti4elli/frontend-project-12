import { createSlice } from '@reduxjs/toolkit'
import { initApp } from './initSlice'
import {
  addChannelThunk,
  removeChannelThunk,
  renameChannelThunk
} from './channelsThunks'
const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
    // Инициализация приложения
      .addCase(initApp.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(initApp.fulfilled, (state, action) => {
        state.channels = action.payload.channels
        state.currentChannelId = action.payload.currentChannelId
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(initApp.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message || 'Failed to initialize app'
      })
    // Добавление канала
      .addCase(addChannelThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      // .addCase(addChannelThunk.fulfilled, (state) => {
      //   state.status = 'succeeded';
      //   state.error = null;
      // })
      .addCase(addChannelThunk.fulfilled, (state, action) => {
        const newChannel = action.payload
        // state.channels.push(newChannel);
        state.currentChannelId = newChannel.id // автоматический переход
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(addChannelThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to add channel'
      })
    // Удаление канала
      .addCase(removeChannelThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(removeChannelThunk.fulfilled, (state, action) => {
        const removedId = action.payload
        state.channels = state.channels.filter(c => c.id !== removedId)
        if (state.currentChannelId === removedId) {
          state.currentChannelId = state.channels[0]?.id ?? null
        }
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(removeChannelThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to remove channel'
      })
    // Переименование канала
      .addCase(renameChannelThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(renameChannelThunk.fulfilled, (state, action) => {
        const { id, name } = action.payload
        const channel = state.channels.find(c => c.id === id)
        if (channel) {
          channel.name = name
        }
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(renameChannelThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to rename channel'
      })
  }
})
export const {
  setCurrentChannelId,
  addChannel
} = channelsSlice.actions
export const selectChannels = state => state.channels.channels
export const selectCurrentChannelId = state => state.channels.currentChannelId
export default channelsSlice.reducer
