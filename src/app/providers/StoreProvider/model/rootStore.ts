import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '@/widgets/editor';
import userReducer from '@/entities/User';
import loginReducer from '@/features/AuthByUsername';
import { $api } from '@/shared/api/api';
import { ThunkExtraArg } from './types';

const extraArg: ThunkExtraArg = {
  api: $api,
};

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    user: userReducer,
    loginForm: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
});
