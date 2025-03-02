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
import { EditorSchema } from './types';
import { saveMapToServer } from './services/saveMapToSever';

const initialState: EditorSchema = {
  id: uuidv4(),
  nodes: [],
  edges: [],
  isEdgeReconnectSuccessful: false,

  isLoading: false,
  error: undefined,
};

const handlePending = (state: EditorSchema) => {
  state.isLoading = false;
};

const handleFulfilled = (
  state: EditorSchema,
  action: PayloadAction<EditorSchema>,
) => {
  return { ...state, ...action.payload, isLoading: false };
};

const handleRejected = (state: EditorSchema) => {
  state.isLoading = false;
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
        type: 'baseNode',
      };
      state.nodes.push(newNode);
    },

    removeSelectedNode: (state) => {
      state.nodes = state.nodes.filter((node) => !node.selected);
    },

    changeNode: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },

    changeNodeLabel: (state, action: PayloadAction<string>) => {
      const node = state.nodes.find((node) => node.selected);
      if (node) node.data.label = action.payload;
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

    saveToLocalStorage: (state) => {
      localStorage.setItem('mindMap', JSON.stringify(state));
    },

    _loadState: (state, action: PayloadAction<EditorSchema>) => {
      return { ...state, ...action.payload };
    },

    loadFromLocalStorage: () => {
      const savedState = localStorage.getItem('mindMap');
      if (!savedState) {
        return;
      }
      const loadedState = JSON.parse(savedState) as EditorSchema;

      return {
        ...loadedState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // saveMapToServer
      .addCase(saveMapToServer.pending, handlePending)
      .addCase(saveMapToServer.fulfilled, handleFulfilled)
      .addCase(saveMapToServer.rejected, handleRejected);
    // loadMapFromServer
  },
});

export const {
  addNode,
  removeSelectedNode,
  changeNode,
  changeEdge,
  createEdge,
  reconnectEdge,
  afterReconnect,
  setIsEdgeReconnectSuccessful,
  saveToLocalStorage,
  loadFromLocalStorage,
  changeNodeLabel,
  _loadState,
} = editorSlice.actions;

export default editorSlice.reducer;
