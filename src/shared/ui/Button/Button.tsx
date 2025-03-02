import { type ReactNode } from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/helpers/classNames';

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = (props: ButtonProps) => {
  const { children, disabled = false, onClick } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classNames(cls.Button, { [cls.disabled]: disabled })}
    >
      {children}
    </button>
  );
};
