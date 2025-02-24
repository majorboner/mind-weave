import { RootState } from '@/app/providers/StoreProvider/model/rootStore';

export const getIsEdgeReconnectSuccessful = (state: RootState) =>
  state.editor.isEdgeReconnectSuccessful;
