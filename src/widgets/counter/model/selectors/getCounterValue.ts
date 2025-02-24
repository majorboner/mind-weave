import { RootState } from '@/app/providers/StoreProvider/model/rootStore';

export const getCounterValue = (state: RootState) => state.counter.value;
