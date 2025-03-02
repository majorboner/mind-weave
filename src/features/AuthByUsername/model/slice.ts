import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginByUsername } from '../../../features/AuthByUsername/model/services/loginByUsername';
import { LoginSchema } from './types';

const initialState: LoginSchema = {
  username: '',
  password: '',
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => ({
      ...state,
      username: action.payload,
    }),
    setPassword: (state, action: PayloadAction<string>) => ({
      ...state,
      password: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loginByUsername.fulfilled, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(loginByUsername.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export const { setPassword, setUsername } = loginSlice.actions;

export default loginSlice.reducer;
