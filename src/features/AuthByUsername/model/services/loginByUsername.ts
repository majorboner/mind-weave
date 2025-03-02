import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/model/types';
import { setUserData, User } from '@/entities/User';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('user/loginByUsername', async (data, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.post<User>('/login', data);

    if (!response.data) {
      throw new Error();
    }

    dispatch(setUserData(response.data));

    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('Неверный логин или пароль');
  }
});
