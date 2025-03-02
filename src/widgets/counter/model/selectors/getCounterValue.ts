import { type RootState } from '@/app/providers/StoreProvider/model/types';

export const getCounterValue = (state: RootState) => state.counter.value;
