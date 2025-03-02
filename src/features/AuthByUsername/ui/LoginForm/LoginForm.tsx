import { AppDispatch } from '@/app/providers/StoreProvider/model/types';
import { getUserData } from '@/entities/User/model/selectors/getUserData';
import { Button } from '@/shared/ui/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername';
import { setUsername, setPassword } from '../../model/slice';
import { TextInput } from '@/shared/ui/TextInput/TextInput';
import cls from './LoginForm.module.scss';

export const LoginForm = () => {
  const userData = useSelector(getUserData);
  const { password, username, isLoading } = useSelector(getLoginState);
  const dispatch: AppDispatch = useDispatch();

  const onChangeUsername = (value: string) => {
    dispatch(setUsername(value));
  };

  const onChangePassword = (value: string) => {
    dispatch(setPassword(value));
  };

  const onLoginClick = async () => {
    await dispatch(loginByUsername({ password, username }));
  };

  return (
    <div className={cls.LoginForm}>
      <p>
        {isLoading
          ? 'Loading...'
          : userData
            ? `You are logged as ${userData.username}`
            : 'You are not logged'}
      </p>
      <TextInput value={username} onChange={onChangeUsername} />
      <TextInput value={password} onChange={onChangePassword} type="password" />
      <Button onClick={onLoginClick}>Login</Button>
    </div>
  );
};
