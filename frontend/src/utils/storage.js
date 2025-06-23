const TOKEN_KEY = 'auth_token'
const USERNAME_KEY = 'auth_username'

export const saveToken = token => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const saveUsername = username => localStorage.setItem(USERNAME_KEY, username)
export const getUsername = () => localStorage.getItem(USERNAME_KEY)
export const removeUsername = () => localStorage.removeItem(USERNAME_KEY)

export const clearAuthStorage = () => {
  removeToken()
  removeUsername()
}
