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
  reconnectEdge as reconnectEdgeFlow,
} from '@xyflow/react';

export interface EditorState {
  nodes: Node[];
  edges: Edge[];
  isEdgeReconnectSuccessful: boolean;
}

const initialState: EditorState = {
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ],
  edges: [],
  isEdgeReconnectSuccessful: false,
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
    createEdge: (state, action: PayloadAction<Connection>) => {
      return { ...state, edges: addEdge(action.payload, state.edges) };
    },
    reconnectEdge: (
      state,
      action: PayloadAction<{ oldEdge: Edge; newConnection: Connection }>,
    ) => {
      return {
        ...state,
        isEdgeReconnectSuccessful: true,
        edges: reconnectEdgeFlow(
          action.payload.oldEdge,
          action.payload.newConnection,
          state.edges,
        ),
      };
    },
    afterReconnect: (
      state,
      action: PayloadAction<{ event: MouseEvent | TouchEvent; edge: Edge }>,
    ) => {
      if (state.isEdgeReconnectSuccessful) {
        return state;
      }

      return {
        ...state,
        isEdgeReconnectSuccessful: true,
        edges: state.edges.filter((e) => e.id !== action.payload.edge.id),
      };
    },
    setIsEdgeReconnectSuccessful: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isEdgeReconnectSuccessful: action.payload,
      };
    },
  },
});

export const {
  changeNode,
  changeEdge,
  createEdge,
  reconnectEdge,
  afterReconnect,
  setIsEdgeReconnectSuccessful,
} = editorSlice.actions;

export default editorSlice.reducer;
