// src/redux/slices/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // or you can use {} if you prefer
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
