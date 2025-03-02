import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/widgets/editor';
import userReducer from '@/entities/User';
import authReducer from '@/features/auth';
import { $api } from '@/shared/api/api';
import { ThunkExtraArg } from './types';

const extraArg: ThunkExtraArg = {
  api: $api,
};

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    user: userReducer,
    authForm: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
});
