import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  account_id: '',
  name: '',
  email: '',
  phone: '',
  reputation: 0,
  role: '',
  biography: '',
  account: {
    username: ''
  },
  badges: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        id = state.id,
        account_id = state.account_id,
        name = state.name,
        email = state.email,
        phone = state.phone,
        reputation = state.reputation,
        role = state.role,
        biography = state.biography,
        account = {},
        badges = []
      } = action.payload

      state.id = id
      state.account_id = account_id
      state.name = name
      state.email = email
      state.phone = phone
      state.reputation = reputation
      state.role = role
      state.biography = biography
      state.account.username = account.username || state.account.username
      state.badges = badges.length ? badges : state.badges
    },
    resetUser: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
