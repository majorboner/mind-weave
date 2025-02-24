import { RootState } from '@/app/providers/StoreProvider/model/rootStore';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../model/slice';

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
};
