import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabaseClient';
import { AppThunk } from '../../app/store';

export type Habit = {
  id: number;
  title: string;
  created_at: Date;
  userId: string;
  frequency: number[];
};

export type HabitsState = Habit[];

const initialState: HabitsState = [];

export const fetchHabits = (orderBy = 'created_at'): AppThunk => async(dispatch) => {
  try {
    const { data, error } = await supabase
      .from('habits')
      .select()
      .order(orderBy, { ascending: false });
    
    if (error) {
      console.log(error);
      //some other logic to show error 
    }

    if (data) {
      dispatch(habitsLoaded(data as Habit[]));
    }
  } catch (err) {
    // if something wrong handle it here
   }
}

export const createHabit = (title: string, frequency: number[]): AppThunk => async (dispatch, getState) => {
  try {
    const userId = getState().profile.id;
    const { data, error } = await supabase
      .from('habits')
      .insert([{ title, userId, frequency }])
      .select();
    
    if (error) {
      console.log(error);
      //some other logic to show error
    }
    if (data) {
      // dispatch(fetchHabits()) //action that fetches habits from server
    }
  } catch (err) {
    // if something wrong handle it here
  }
};

// export const fetchHabitById = (id: number): AppThunk => async (dispatch) => {
//   try {
//     const { data, error } = await supabase
//         .from('habits')
//         .select()
//         .eq('id', id)
//         .single();

//       if (error) {
//         console.log(error);
//       }
//     if (data) {
//       //
//       }
    
//   } catch (err) {
//     //handle error
//   }
// }

export const updateHabit = (id: number, title: string): AppThunk => async (dispatch) => {

  try {
    const { data, error } = await supabase
        .from('habits')
        .update({ title })
        .eq('id', id)
        .select();

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
      // dispatch(fetchHabits()) //action that fetches habits from server
      }
  } catch (err) {
    // handle error
  }
   
}

export const deleteHabit = (id: number): AppThunk => async(dispatch) => {
  try {
    console.log('delete', id);
    
    const { data, error } = await supabase
        .from('habits')
        .delete()
        .eq('id', id)
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        dispatch(fetchHabits());
      }
  } catch (err) {
    // some logic to handle error
  }
}

export const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    habitsLoaded: (state, action: PayloadAction<Habit[]>) => {
      return action.payload;
    }
  }
})

export const { habitsLoaded } = habitsSlice.actions;

export default habitsSlice.reducer;