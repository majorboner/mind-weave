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
} from '../../model/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../model/selectors/getNodes';
import { getEdges } from '../../model/selectors/getEdges';
import cls from './Editor.module.scss';
import { BaseNode } from '../BaseNode/BaseNode';
import { useMemo } from 'react';
import { Button } from '@/shared/ui/Button/Button';

export const Editor = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(getNodes);
  const edges = useSelector(getEdges);

  const nodeTypes = useMemo(() => ({ baseNode: BaseNode }), []);

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
      <button onClick={() => console.log(nodes)} className={cls.button}>
        Print nodes
      </button>
      <button onClick={() => console.log(edges)} className={cls.button}>
        Print edges
      </button>
    </div>
  );

  const Toolbar = () => (
    <div className={cls.toolbar}>
      <Button onClick={() => dispatch(addNode())}>New node</Button>
      <Button onClick={() => dispatch(removeSelectedNode())}>
        Remove selected node
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
