import { Node, Edge } from '@xyflow/react';

export interface EditorSchema {
  id: string;
  nodes: Node[];
  edges: Edge[];
  isEdgeReconnectSuccessful: boolean;
  isLoading: boolean;
  error?: string;
}
