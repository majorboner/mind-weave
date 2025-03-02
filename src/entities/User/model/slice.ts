import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserSchema } from './types';

const initialState: UserSchema = {
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = undefined;
    },
  },
});

export const { setUserData, logout } = userSlice.actions;

export default userSlice.reducer;
