import { RootState } from '@/app/providers/StoreProvider/model/rootStore';

export const getNodes = (state: RootState) => state.editor.nodes;
