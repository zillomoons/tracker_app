import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type ProfileState = {
  id: string;
  username: string,
  email: string;
}

const initialState: ProfileState = {
  id: '71ca9f5f-63eb-4b64-9187-36c9663b73d8',
  username: 'Tianna',
  email: 'tianna@lamail.com',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
})

export default profileSlice.reducer;

export const selectUser = (state: RootState) => state.profile;