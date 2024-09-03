import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { UsersSlice, User } from '@/types'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
})

const initialState: UsersSlice = {
  entities: [],
  filteredEntities: [],
  loading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    filterByName: (state, action: PayloadAction<string>) => {
      state.filteredEntities = state.entities.filter((user) =>
        user.name.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
    filterByUsername: (state, action: PayloadAction<string>) => {
      state.filteredEntities = state.entities.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
    filterByEmail: (state, action: PayloadAction<string>) => {
      state.filteredEntities = state.entities.filter((user) =>
        user.email.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
    filterByPhone: (state, action: PayloadAction<string>) => {
      state.filteredEntities = state.entities.filter((user) =>
        user.phone.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.entities = action.payload
        state.filteredEntities = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch users'
      })
  },
})

export const { filterByName, filterByUsername, filterByEmail, filterByPhone } = usersSlice.actions

export default usersSlice.reducer
