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
} from '../../model/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../model/selectors/getNodes';
import { getEdges } from '../../model/selectors/getEdges';
import cls from './Editor.module.scss';

export const Editor = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(getNodes);
  const edges = useSelector(getEdges);

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

  const onReconnectEnd = (event: MouseEvent | TouchEvent, edge: Edge) => {
    dispatch(afterReconnect({ event, edge }));
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

  return (
    <>
      <DebugPanel />
      <ReactFlow
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
    </>
  );
};
