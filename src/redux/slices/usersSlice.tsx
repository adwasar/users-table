import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import type { UsersSlice, User, FilterPayload } from '@/types'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
})

const initialState: UsersSlice = {
  entities: [],
  filteredEntities: [],
  filters: {
    name: '',
    username: '',
    email: '',
    phone: '',
  },
  loading: false,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterPayload>) => {
      state.filters[action.payload.filter] = action.payload.value.toLowerCase()

      state.filteredEntities = state.entities.filter((user) => {
        return (
          user.name.toLowerCase().includes(state.filters.name) &&
          user.username.toLowerCase().includes(state.filters.username) &&
          user.email.toLowerCase().includes(state.filters.email) &&
          user.phone.toLowerCase().includes(state.filters.phone)
        )
      })
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

export const { setFilter } = usersSlice.actions

export default usersSlice.reducer
