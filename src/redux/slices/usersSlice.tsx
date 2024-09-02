import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { UsersSlice, User } from '@/types'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
})

const initialState: UsersSlice = {
  entities: [],
  loading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // initUsers: (state, action) => { 
    //   state.entities = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.entities = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
  },
})

// export const { initUsers } = usersSlice.actions

export default usersSlice.reducer
