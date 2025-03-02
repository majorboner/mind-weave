import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/model/types';
import { setUserData, User } from '@/entities/User';
import { AxiosError } from 'axios';

interface RegisterProps {
  username: string;
  password: string;
}

export const registerNewUser = createAsyncThunk<
  User,
  RegisterProps,
  ThunkConfig<string>
>('auth/registerNewUser', async (data, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.post<User>('/register', data);

    if (!response.data) {
      throw new Error();
    }

    dispatch(setUserData(response.data));

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Unknown error';
      return rejectWithValue('Sign up failed: ' + message);
    }
    return rejectWithValue('Sign up failed: An unexpected error occurred');
  }
});
