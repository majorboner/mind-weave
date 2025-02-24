import { Counter } from '@/widgets/counter';
import cls from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={cls.HomePage}>
      <h1>It&apos;s the home page</h1>
      <Counter />
      <p>end of page</p>
    </div>
  );
};
