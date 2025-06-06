import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  modal: {
    type: null, // 'addChannel', 'removeChannel', 'renameChannel'
    channelId: null,
  },
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, channelId = null } = action.payload;
      state.modal.type = type;
      state.modal.channelId = channelId;
    },
    closeModal: state => {
      state.modal = { type: null, channelId: null };
    },
  },
});
export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
