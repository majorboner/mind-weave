import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginByUsername } from './services/loginByUsername';
import { AuthSchema } from './types';
import { registerNewUser } from './services/registerNewUser';

const initialState: AuthSchema = {
  username: '',
  password: '',
  isLoading: false,
  passwordRepeat: '',
  error: undefined,
};

const handlePending = (state: AuthSchema) => {
  state.isLoading = true;
  state.error = undefined;
};

const handleFulfilled = (state: AuthSchema) => {
  state.isLoading = false;
  state.username = '';
  state.password = '';
  state.error = undefined;
};

const handleRejected = (
  state: AuthSchema,
  action: PayloadAction<string | undefined>,
) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPasswordRepeat: (state, action: PayloadAction<string>) => {
      state.passwordRepeat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginByUsername
      .addCase(loginByUsername.pending, handlePending)
      .addCase(loginByUsername.fulfilled, handleFulfilled)
      .addCase(loginByUsername.rejected, handleRejected)
      // registerNewUser
      .addCase(registerNewUser.pending, handlePending)
      .addCase(registerNewUser.fulfilled, handleFulfilled)
      .addCase(registerNewUser.rejected, handleRejected);
  },
});

export const { setPassword, setUsername, setPasswordRepeat } =
  authSlice.actions;

export default authSlice.reducer;
