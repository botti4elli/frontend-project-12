import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentChannelId: null,
  modal: {
    type: null,
    channelId: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload
    },
    openModal: (state, action) => {
      const { type, channelId = null } = action.payload
      state.modal = { type, channelId }
    },
    closeModal: (state) => {
      state.modal = { type: null, channelId: null }
    },
  },
})

export const {
  setCurrentChannelId,
  openModal,
  closeModal,
} = uiSlice.actions

export const selectCurrentChannelId = state => state.ui.currentChannelId

export default uiSlice.reducer
