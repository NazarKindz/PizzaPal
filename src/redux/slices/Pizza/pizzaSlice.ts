import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IPizzaBlockProps } from 'components/PizzaBlock/PizzaBlock';
import { RootState } from 'redux/store';
import { IFetchPizzasProps, IPizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params: IFetchPizzasProps) => {
  const { order, sortBy, category, search, currentPage } = params;
  const {data} = await axios.get<IPizzaBlockProps[]>(
    `https://68b6c5c273b3ec66cec2a52e.mockapi.io/products?page=${currentPage}&limit=4${category}${search}&sortBy=${sortBy}&order=${order}`,
  );

  return data;
});

const initialState: IPizzaSliceState = {
  pizzas: [],
  status: Status.LOADING
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
   setPizzas(state, action) {
    state.pizzas = action.payload;
   }
  },
  extraReducers: (builder) => {
     builder
       .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pizzas = [];
       })
       .addCase(fetchPizzas.fulfilled, (state, action) => {
         state.pizzas = action.payload;
         state.status = Status.SUCCESS;
       })
       .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.pizzas = [];
       })
  }
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
