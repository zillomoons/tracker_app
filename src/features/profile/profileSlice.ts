import { createSlice } from "@reduxjs/toolkit";

type ProfileState = {
  id: string;
  username: string,
  email: string;
}

const initialState: ProfileState = {
  id: '3df05503-8b92-4a8f-b195-4828159ad0c7',
  username: 'Tianna',
  email: 'tianna@lamail.com',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {}
})

export default profileSlice.reducer;