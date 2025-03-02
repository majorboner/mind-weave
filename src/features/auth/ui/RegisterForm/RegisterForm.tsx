import { Button } from '@/shared/ui/Button/Button';
import cls from './RegisterForm.module.scss';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginState } from '../../model/selectors/getLoginState';
import { AppDispatch } from '@/app/providers/StoreProvider/model/types';
import { setPassword, setPasswordRepeat, setUsername } from '../../model/slice';
import { registerNewUser } from '../../model/services/registerNewUser';

export const RegisterForm = () => {
  const { password, username, passwordRepeat, error } =
    useSelector(getLoginState);
  const dispatch: AppDispatch = useDispatch();

  const onChangeUsername = (value: string) => {
    dispatch(setUsername(value));
  };

  const onChangePassword = (value: string) => {
    dispatch(setPassword(value));
  };

  const onChangePasswordRepeat = (value: string) => {
    dispatch(setPasswordRepeat(value));
  };

  const onRegisterClick = async () => {
    if (password !== passwordRepeat) {
      return;
    }
    await dispatch(registerNewUser({ password, username }));
  };

  return (
    <div className={cls.RegisterForm}>
      {error && <p>{error}</p>}
      <TextInput value={username} onChange={onChangeUsername} />
      <TextInput value={password} onChange={onChangePassword} type="password" />
      <TextInput
        value={passwordRepeat}
        onChange={onChangePasswordRepeat}
        type="password"
      />
      <Button onClick={onRegisterClick}>Register</Button>
    </div>
  );
};
