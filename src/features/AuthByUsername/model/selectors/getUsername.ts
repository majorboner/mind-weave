import { RootState } from '@/app/providers/StoreProvider/model/types';

export const getUsername = (state: RootState) => state.loginForm.username;
