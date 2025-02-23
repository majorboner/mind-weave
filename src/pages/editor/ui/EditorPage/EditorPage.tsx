import { Background, Controls, ReactFlow } from '@xyflow/react';
import './flow.css';

export const EditorPage = () => {
  return (
    <>
      <ReactFlow width={1000} height={1000}>
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
};
