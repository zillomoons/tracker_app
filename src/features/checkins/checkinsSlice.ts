import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { supabase } from "../config/supabaseClient";

type PrevCheckin = {
  id: number;
  created_at: Date;
  habitId: number;
}

export type Checkin = Omit<PrevCheckin, 'created_at'> & { createdAt: string };

type CheckinsState = {
  checkins: PrevCheckin[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CheckinsState = {
  checkins: [],
  status: 'idle',
  error: null,
}

export const fetchCheckins = createAsyncThunk(
  'checkins/fetchCheckins',
  async () => {
    const res = await supabase.from('checkins').select();
    return res.data as PrevCheckin[];
  }
);
export const createCheckin = createAsyncThunk<PrevCheckin[], { habitId: number, created_at: Date }>('checkins/createCheckin', async ({ habitId, created_at }) => {
  const res = await supabase.from('checkins').insert({ habitId, created_at }).select();
  return res.data as PrevCheckin[];
});
export const deleteCheckin = createAsyncThunk<PrevCheckin[], { id: number }>('checkins/deleteCheckin', async ({ id }) => {
  const res = await supabase.from('checkins').delete().eq('id', id).select();
  return res.data as PrevCheckin[];
});

const checkinsSlice = createSlice({
  name: 'checkins',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCheckins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCheckins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkins = action.payload;
      })
      .addCase(fetchCheckins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong.'
      })
      .addCase(createCheckin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.checkins.push(action.payload[0]);
      })
      .addCase(deleteCheckin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.checkins.findIndex(checkin => checkin.id === action.payload[0].id);
        if (index > -1) {
          state.checkins.splice(index, 1);
        }
        
    })
  }
})

export default checkinsSlice.reducer;

export const selectAllCheckins = (state: RootState) => state.checkins.checkins.map(checkin => ({...checkin, createdAt: new Date(checkin.created_at).toDateString()}));


