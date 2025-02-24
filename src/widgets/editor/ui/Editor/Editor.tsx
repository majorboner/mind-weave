import {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlow,
} from '@xyflow/react';
import './flow.css';
import { changeNode, changeEdge, connectNodes } from '../../model/slice';
import { useDispatch, useSelector } from 'react-redux';
import { getNodes } from '../../model/selectors/getNodes';
import { getEdges } from '../../model/selectors/getEdges';

export const Editor = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(getNodes);
  const edges = useSelector(getEdges);

  const onNodesChange = (changes: NodeChange<Node>[]) =>
    dispatch(changeNode(changes));

  const onEdgesChange = (changes: EdgeChange<Edge>[]) =>
    dispatch(changeEdge(changes));

  const onConnect = (params: Connection) => dispatch(connectNodes(params));

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={onNodesChange}
      edges={edges}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};
