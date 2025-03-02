import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
import { v4 as uuidv4 } from 'uuid';

export interface EditorState {
  nodes: Node[];
  edges: Edge[];
  isEdgeReconnectSuccessful: boolean;
}

const initialState: EditorState = {
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    {
      id: '2',
      position: { x: 0, y: 100 },
      data: { label: '2' },
      type: 'baseNode',
    },
  ],
  edges: [],
  isEdgeReconnectSuccessful: false,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addNode: (state) => {
      const newNode: Node = {
        id: uuidv4(),
        data: { label: 'new' },
        position: { x: 0, y: 0 },
      };
      state.nodes.push(newNode);
    },
    changeNode: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    changeEdge: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    createEdge: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    reconnectEdge: (
      state,
      action: PayloadAction<{ oldEdge: Edge; newConnection: Connection }>,
    ) => {
      state.isEdgeReconnectSuccessful = true;
      state.edges = reconnectEdgeFlow(
        action.payload.oldEdge,
        action.payload.newConnection,
        state.edges,
      );
    },
    afterReconnect: (state, action: PayloadAction<{ edge: Edge }>) => {
      if (state.isEdgeReconnectSuccessful) {
        return;
      }
      state.isEdgeReconnectSuccessful = true;
      state.edges = state.edges.filter((e) => e.id !== action.payload.edge.id);
    },
    setIsEdgeReconnectSuccessful: (state, action: PayloadAction<boolean>) => {
      state.isEdgeReconnectSuccessful = action.payload;
    },
  },
});

export const {
  addNode,
  changeNode,
  changeEdge,
  createEdge,
  reconnectEdge,
  afterReconnect,
  setIsEdgeReconnectSuccessful,
} = editorSlice.actions;

export default editorSlice.reducer;
