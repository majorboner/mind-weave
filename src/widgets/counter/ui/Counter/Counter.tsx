import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../model/slice';
import { getCounterValue } from '../../model/selectors/getCounterValue';
import { Button } from '@/shared/ui/Button/Button';

export const Counter = () => {
  const count = useSelector(getCounterValue);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <Button onClick={() => dispatch(increment())}>increment</Button>
        <Button onClick={() => dispatch(decrement())}>decrement</Button>
      </div>
    </div>
  );
};
