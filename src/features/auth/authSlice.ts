import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateError, StateStatus } from "../habits/habitsSlice";
import { supabase } from "../../config/supabaseClient";
import { AuthError, Session, User, UserResponse } from "@supabase/supabase-js";
import { RootState } from "../../app/store";

type AuthType = {
  user: User | null,
  session: Session | null;
  
}

export type AuthState = {
  auth: AuthType,
  status: StateStatus;
  error: StateError;
}

const initialState: AuthState = {
  auth: {user: null, session: null},
  status: 'idle',
  error: null
}

export const login = createAsyncThunk<AuthType, { email: string, password: string }>('auth/login', async ({ email, password }) => {
  const res = await supabase.auth.signInWithPassword({ email, password });
  return res.data as AuthType;
})

export const signOut = createAsyncThunk('auth/signout', async() => {
  const { error } = await supabase.auth.signOut();
  error && console.log(error);
})

export const recoverPass = createAsyncThunk<AuthError | undefined, string>('auth/recoverPass', async (email) => {
  const {error} = await supabase.auth.resetPasswordForEmail(email);
  if (error) return error;
  return undefined
})
export const resetPass = createAsyncThunk<UserResponse, {email: string, password: string}>('auth/resetPass', async ({email, password }) => {
  const res = await supabase.auth.updateUser({email, password});
  return res;
})
export const getSession = createAsyncThunk('auth/getSession', async () => {
  return await supabase.auth.getSession().then(({ data: { session } }) => session)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(login.pending, state => {
      state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.auth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to login.'
      })
      .addCase(signOut.fulfilled, (state) => {
        state.auth = {user: null, session: null};
      })
      .addCase(recoverPass.fulfilled, (state) => {
      state.status = 'succeeded'
      })
      .addCase(recoverPass.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to recover password.'
      })
      .addCase(resetPass.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to reset password'
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.auth.session = action.payload;
      })
  }
})

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth.auth;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;