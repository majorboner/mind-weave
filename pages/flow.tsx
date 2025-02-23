import { Background, Controls, ReactFlow } from '@xyflow/react';
import './flow.css';

export default function Page() {
  return (
    <>
      <ReactFlow width={1000} height={1000}>
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
}
