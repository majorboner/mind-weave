import { AppDispatch } from '@/app/providers/StoreProvider/model/types';
import { getUserData } from '@/entities/User/model/selectors/getUserData';
import { Button } from '@/shared/ui/Button/Button';
import { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername';
import { setUsername, setPassword } from '../../model/slice';

export const LoginForm = () => {
  const userData = useSelector(getUserData);
  const { password, username, isLoading } = useSelector(getLoginState);
  const dispatch: AppDispatch = useDispatch();

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsername(event?.target.value));
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(event?.target.value));
  };

  const onLoginClick = async () => {
    await dispatch(loginByUsername({ password, username }));
  };
  return (
    <div>
      <p>
        {isLoading
          ? 'Loading...'
          : userData
            ? `You are logged as ${userData.username}`
            : 'You are not logged'}
      </p>
      <input type="text" value={username} onChange={onChangeUsername} />
      <input type="password" value={password} onChange={onChangePassword} />
      <Button onClick={onLoginClick}>Login</Button>
    </div>
  );
};
