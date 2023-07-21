import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import habitsReducer from '../features/habits/habitsSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    habits: habitsReducer,
    profile: profileReducer,
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;