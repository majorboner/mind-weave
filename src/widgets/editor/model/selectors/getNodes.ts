import { type RootState } from '@/app/providers/StoreProvider/model/types';

export const getNodes = (state: RootState) => state.editor.nodes;
