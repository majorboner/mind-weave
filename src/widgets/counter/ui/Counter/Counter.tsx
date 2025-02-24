import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../model/slice';
import { getCounterValue } from '../../model/selectors/getCounterValue';

export const Counter = () => {
  const count = useSelector(getCounterValue);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
};
