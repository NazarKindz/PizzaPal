import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = filterSlice.actions;
// learning redux toolkit

export default filterSlice.reducer;
