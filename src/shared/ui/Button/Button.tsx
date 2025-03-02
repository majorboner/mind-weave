import { type ReactNode } from 'react';
import cls from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick } = props;

  return (
    <button type="button" onClick={onClick} className={cls.Button}>
      {children}
    </button>
  );
};
