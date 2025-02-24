import { RootState } from '@/app/providers/StoreProvider/model/rootStore';

export const getEdges = (state: RootState) => state.editor.edges;
