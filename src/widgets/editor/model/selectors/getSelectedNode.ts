import { RootState } from '@/app/providers/StoreProvider/model/types';

export const getSelectedNode = (state: RootState) =>
  state.editor.nodes.find((node) => node.selected);
