/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersSlice {
  value: any
}

const initialState: UsersSlice = {
  value: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initUsers: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { initUsers } = usersSlice.actions

export default usersSlice.reducer
