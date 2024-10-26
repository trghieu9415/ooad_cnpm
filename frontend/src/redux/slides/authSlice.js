import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenAdmin: false,
  tokenAdmin: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenAdmin = true
      state.tokenAdmin = action.payload
    },
    logout: (state) => {
      state.isAuthenAdmin = false
      state.tokenAdmin = null
    }
  }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
