import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import habitsReducer from '../features/habits/habitsSlice';
import profileReducer from '../features/profile/profileSlice';
import checkinsReducer from '../features/checkins/checkinsSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    habits: habitsReducer,
    profile: profileReducer,
    checkins: checkinsReducer,
    auth: authReducer
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