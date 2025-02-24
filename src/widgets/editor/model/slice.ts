import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from '@xyflow/react';

export interface EditorState {
  nodes: Node[];
  edges: Edge[];
}

const initialState: EditorState = {
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ],
  edges: [],
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    changeNode: (state, action: PayloadAction<NodeChange[]>) => {
      return { ...state, nodes: applyNodeChanges(action.payload, state.nodes) };
    },
    changeEdge: (state, action: PayloadAction<EdgeChange[]>) => {
      return { ...state, edges: applyEdgeChanges(action.payload, state.edges) };
    },
    connectNodes: (state, action: PayloadAction<Connection>) => {
      return { ...state, edges: addEdge(action.payload, state.edges) };
    },
  },
});

export const { changeNode, changeEdge, connectNodes } = editorSlice.actions;

export default editorSlice.reducer;
