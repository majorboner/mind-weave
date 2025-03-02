import {
  Background,
  Controls,
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnReconnect,
  ReactFlow,
} from '@xyflow/react';
import './flow.css';
import {
  changeNode,
  changeEdge,
  createEdge,
  setIsEdgeReconnectSuccessful,
  reconnectEdge,
  afterReconnect,
  addNode,
  removeSelectedNode,
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../../model/slice';
import { useDispatch, useSelector } from 'react-redux';
import cls from './Editor.module.scss';
import { BaseNode } from '../BaseNode/BaseNode';
import { Button } from '@/shared/ui/Button/Button';
import { getEditorState } from '../../model/selectors/getEditorState';
import { saveMapToServer } from '../../model/services/saveMapToSever';
import { AppDispatch } from '@/app/providers/StoreProvider/model/types';
import { loadMapFromServer } from '../../model/services/loadMapFromServer';
import { getSelectedNode } from '../../model/selectors/getSelectedNode';

const nodeTypes = { baseNode: BaseNode };

export const Editor = () => {
  const dispatch: AppDispatch = useDispatch();
  const { edges, nodes } = useSelector(getEditorState);
  const selectedNode = useSelector(getSelectedNode);

  const onNodesChange: OnNodesChange = (changes) =>
    dispatch(changeNode(changes));

  const onEdgesChange: OnEdgesChange = (changes) =>
    dispatch(changeEdge(changes));

  const onConnect: OnConnect = (params) => dispatch(createEdge(params));

  const onReconnectStart = () => {
    dispatch(setIsEdgeReconnectSuccessful(false));
  };

  const onReconnect: OnReconnect = (oldEdge, newConnection) => {
    dispatch(reconnectEdge({ oldEdge, newConnection }));
  };

  const onReconnectEnd = (_: MouseEvent | TouchEvent, edge: Edge) => {
    dispatch(afterReconnect({ edge }));
  };

  const DebugPanel = () => (
    <div className={cls.debugPanel}>
      <Button onClick={() => console.log(nodes)}>Print nodes</Button>
      <Button onClick={() => console.log(edges)}>Print edges</Button>
      <Button onClick={() => dispatch(saveToLocalStorage())}>
        Save to local storage
      </Button>
      <Button onClick={() => dispatch(loadFromLocalStorage())}>
        Load from local storage
      </Button>
      <Button onClick={() => dispatch(saveMapToServer())}>
        Save to server
      </Button>
      <Button onClick={() => dispatch(loadMapFromServer())}>
        Load from server
      </Button>
    </div>
  );

  const Toolbar = () => (
    <div className={cls.toolbar}>
      <Button onClick={() => dispatch(addNode())}>New node</Button>
      <Button
        disabled={selectedNode == null}
        onClick={() => dispatch(removeSelectedNode())}
      >
        Remove selected node
      </Button>
      <Button onClick={() => dispatch(removeSelectedNode())}>
        {selectedNode?.id}
      </Button>
    </div>
  );

  return (
    <>
      <DebugPanel />
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <Toolbar />
    </>
  );
};
