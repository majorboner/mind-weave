import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/model/types';
import { setUserData, User } from '@/entities/User';
import { AxiosError } from 'axios';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('auth/loginByUsername', async (data, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.post<User>('/login', data);

    if (!response.data) {
      throw new Error();
    }

    dispatch(setUserData(response.data));

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Unknown error';
      return rejectWithValue('Sign in failed: ' + message);
    }
    return rejectWithValue('Sign in failed: An unexpected error occurred');
  }
});
