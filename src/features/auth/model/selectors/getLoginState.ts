import { RootState } from '@/app/providers/StoreProvider/model/types';

export const getLoginState = (state: RootState) => state.authForm;
