import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider/model/types';
import { AxiosError } from 'axios';
import { EditorSchema } from '../types';
import { _loadState } from '../slice';

export const loadMapFromServer = createAsyncThunk<
  EditorSchema,
  undefined,
  ThunkConfig<string>
>('editor/loadMapFromServer', async (_, thunkApi) => {
  const { extra, rejectWithValue, dispatch, getState } = thunkApi;
  const mapId = getState().editor.id;
  if (mapId == null) {
    throw new Error();
  }
  try {
    const response = await extra.api.get<EditorSchema>(
      `/loadmap?mapId=${mapId}`,
      {},
    );

    if (!response.data) {
      throw new Error();
    }
    dispatch(_loadState(response.data));

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Unknown error';
      return rejectWithValue('Save map failed: ' + message);
    }
    return rejectWithValue('Save map failed: An unexpected error occurred');
  }
});
