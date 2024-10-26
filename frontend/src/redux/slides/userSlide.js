import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: '',
  member: {
    id: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { fullName = '', member = {} } = action.payload
      state.fullName = fullName ? fullName : state.fullName
      state.member.id = member.id ? member.id : state.member.id
    },
    resetUser: (state) => {
      state.fullName = ''
      state.member.id = ''
    }
  }
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
