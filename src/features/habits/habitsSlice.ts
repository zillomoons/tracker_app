import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabaseClient';
import { AppDispatch, RootState } from '../../app/store';
import { Checkin } from '../checkins/checkinsSlice';

type PrevHabit = {
  id: number;
  title: string;
  created_at: Date;
  userId: string;
  frequency: DayOfWeek[];
  checkins: Checkin[];
};

export type StateStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
export type StateError = string | null

export type HabitsState = {
  habits: PrevHabit[];
  status: StateStatus;
  error: StateError;
}

export type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type InitHabit = {
  title: string;
  frequency: DayOfWeek[];
}

type EditHabit = InitHabit & { id: number };

const initialState: HabitsState = {
  habits: [],
  status: 'idle',
  error: null
};

export const fetchHabits = createAsyncThunk<PrevHabit[], string>('habits/fetchHabits', async (orderBy?) => {
  orderBy = orderBy || 'created_at';
  const res = await supabase.from('habits').select().order(orderBy, { ascending: false });
  return res.data as PrevHabit[];
})

export const createHabit = createAsyncThunk<PrevHabit[], InitHabit, {state: RootState, dispatch: AppDispatch}>('habits/addNewHabit', async ({title, frequency}, thunkApi) => {
    const userId = thunkApi.getState().profile.id;
    const res = await supabase
      .from('habits')
      .insert([{ title, userId, frequency }])
      .select();
  return res.data as unknown as PrevHabit[];
});

export const updateHabit = createAsyncThunk<PrevHabit[], EditHabit>('habits/updateHabit', async ({ id, title, frequency }) => {
  const res = await supabase.from('habits').update({ title, frequency }).eq('id', id).select();
  return res.data as PrevHabit[];
})

export const deleteHabit = createAsyncThunk<PrevHabit[], { id: number }>('habits/deleteHabit', async ({ id }) => {
  const res = await supabase.from('habits').delete().eq('id', id).select();
  return res.data as PrevHabit[];
})

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHabits.pending, (state) => {
      state.status = 'loading'
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.habits = action.payload
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong.'
      }).addCase(createHabit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.habits.unshift(action.payload[0]);
      }).addCase(updateHabit.fulfilled, (state) => {
        state.status = 'succeeded';
      }).addCase(deleteHabit.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.habits.findIndex(habit => habit.id === action.payload[0].id);
        if (index > -1) {
          state.habits.splice(index, 1)
        }
      })
  }
})


export default habitsSlice.reducer;

export const _selectAllHabits = (state: RootState) => state.habits.habits;

export type Habit = Omit<PrevHabit, 'created_at'> & { createdAt: string };

export const selectAllHabits = createSelector(_selectAllHabits, (habits) => habits.map(habit => ({ ...habit, createdAt: new Date(habit.created_at).toDateString() })));
export const selectHabitStatus = (state: RootState) => state.habits.status;
export const selectHabitError = (state: RootState) => state.habits.error;