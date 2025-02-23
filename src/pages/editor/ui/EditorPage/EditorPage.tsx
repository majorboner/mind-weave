import { Background, Controls, ReactFlow } from '@xyflow/react';
import './flow.css';
import cls from './EditorPage.module.scss';

export const EditorPage = () => {
  return (
    <div className={cls.EditorPage}>
      <ReactFlow width={1000} height={1000}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
