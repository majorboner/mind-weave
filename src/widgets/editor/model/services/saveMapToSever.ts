import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/model/types';
import { AxiosError } from 'axios';
import { EditorSchema } from '../types';

export const saveMapToServer = createAsyncThunk<
  EditorSchema,
  undefined,
  ThunkConfig<string>
>('editor/saveMapToServer', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  try {
    const response = await extra.api.post<EditorSchema>(
      '/savemap',
      getState().editor,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Unknown error';
      return rejectWithValue('Save map failed: ' + message);
    }
    return rejectWithValue('Save map failed: An unexpected error occurred');
  }
});
