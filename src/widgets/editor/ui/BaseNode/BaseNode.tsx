import { Handle, Node, NodeProps, NodeResizer, Position } from '@xyflow/react';
import { useCallback } from 'react';
import cls from './BaseNode.module.scss';
import { useDispatch } from 'react-redux';
import { changeNodeLabel } from '../../model/slice';
import { classNames } from '@/shared/lib/helpers/classNames';
import { TextInput } from '@/shared/ui/TextInput/TextInput';

type BaseNodeProps = Node<{ label: string }, 'tests'>;

const left = { left: 0 };
const right = { left: '100%' };

export const BaseNode = (props: NodeProps<BaseNodeProps>) => {
  const { data, isConnectable, selected } = props;
  const dispatch = useDispatch();

  const onChangeLabel = useCallback(
    (value: string) => {
      dispatch(changeNodeLabel(value));
    },
    [dispatch],
  );

  return (
    <div className={classNames(cls.BaseNode, { [cls.active]: selected })}>
      <NodeResizer minWidth={100} minHeight={30} />
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
        <TextInput
          id="text"
          name="text"
          value={data.label}
          onChange={onChangeLabel}
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
