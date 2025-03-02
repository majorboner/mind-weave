import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cls from './TextInput.module.scss';

type TextInputBaseProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'onChange' | 'type'
>;

type TextInputType = 'text' | 'password';

interface TextInputProps extends TextInputBaseProps {
  onChange: (value: string) => void;
  type?: TextInputType;
}

export const TextInput = (props: TextInputProps) => {
  const { onChange, type = 'text', value } = props;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <input
      type={type}
      onChange={handleOnChange}
      value={value}
      className={cls.TextInput}
    ></input>
  );
};
