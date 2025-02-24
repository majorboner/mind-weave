import {
  Background,
  Controls,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from '@xyflow/react';
import './flow.css';
import { changeNode, changeEdge, connectNodes } from '../../model/slice';
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

  const onConnect: OnConnect = (params) => dispatch(connectNodes(params));

  return (
    <>
      <div className={cls.debugPanel}>
        <button onClick={() => console.log(nodes)} className={cls.button}>
          Print nodes
        </button>
        <button onClick={() => console.log(edges)} className={cls.button}>
          Print edges
        </button>
      </div>
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
    </>
  );
};
