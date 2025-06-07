import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'
import initReducer from './slices/initSlice'
import uiReducer from './slices/uiSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    init: initReducer,
    ui: uiReducer
  }
})
