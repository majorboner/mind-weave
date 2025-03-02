import { type RootState } from '@/app/providers/StoreProvider/model/types';

export const getIsEdgeReconnectSuccessful = (state: RootState) =>
  state.editor.isEdgeReconnectSuccessful;
