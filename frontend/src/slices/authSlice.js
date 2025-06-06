import { createSlice } from '@reduxjs/toolkit';
const storedToken = localStorage.getItem('token');
const storedUsername = localStorage.getItem('username');
const initialState = {
  token: storedToken,
  username: storedUsername,
  isAuthenticated: !!storedToken,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token: newToken, username: newUsername } = action.payload;
      state.token = newToken;
      state.username = newUsername;
      state.isAuthenticated = true;
      localStorage.setItem('token', newToken);
      localStorage.setItem('username', newUsername);
    },
    logout: state => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
// Селекторы
export const selectToken = state => state.auth.token;
export const selectUsername = state => state.auth.username;
export default authSlice.reducer;
