import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import certificationReducer from '../features/certificationSlice'

export const store = configureStore({
  reducer: {
    certification: certificationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
