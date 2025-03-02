import { Handle, Position } from '@xyflow/react';
import { ChangeEvent, useCallback } from 'react';
import cls from './BaseNode.module.scss';
import { useDispatch } from 'react-redux';
import { setSelectedNode } from '../../model/slice';

interface BaseNodeProps {
  id: string;
  data: { label: string };
  isConnectable: boolean;
}

const left = { left: 0 };
const right = { left: '100%' };

export const BaseNode = (props: BaseNodeProps) => {
  const { id, data, isConnectable } = props;
  const dispatch = useDispatch();

  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  const onClickNode = useCallback(() => {
    dispatch(setSelectedNode(id));
  }, [dispatch, id]);

  return (
    <div className={cls.BaseNode} onClick={onClickNode}>
      <Handle
        type="target"
        id="q"
        style={right}
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        id="w"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        id="e"
        style={left}
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <input
          id="text"
          name="text"
          value={data.label}
          onChange={onChange}
          className="nodrag"
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        style={right}
        position={Position.Bottom}
        id="c"
        isConnectable={isConnectable}
      />
    </div>
  );
};
