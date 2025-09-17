import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async ({order, sortBy, category, search, currentPage}) => {
  const response = await axios.get(
    `https://68b6c5c273b3ec66cec2a52e.mockapi.io/products?page=${currentPage}&limit=4${category}${search}&sortBy=${sortBy}&order=${order}`,
  );

  return response.data;
});

const initialState = {
  items: [],
  status: 'loading' // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
   setItems(state, action) {
    state.items = action.payload;
   }
  },
  extraReducers: (builder) => {
     builder
       .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload;
         state.status = 'success';
       })
       .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
       })
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
