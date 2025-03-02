import { type RootState } from '@/app/providers/StoreProvider/model/types';

export const getUserData = (state: RootState) => state.user.userData;
