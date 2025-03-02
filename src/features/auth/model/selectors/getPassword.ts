import { RootState } from '@/app/providers/StoreProvider/model/types';

export const getPassword = (state: RootState) => state.authForm.password;
