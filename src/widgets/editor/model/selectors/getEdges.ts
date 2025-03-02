import { type RootState } from '@/app/providers/StoreProvider/model/types';

export const getEdges = (state: RootState) => state.editor.edges;
