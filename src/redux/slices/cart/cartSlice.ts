import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'redux/store';
import { calcTotalPrice } from 'utils/calcTotalPrice';
import { getCartFromLS } from 'utils/getCartFromLS';

import { ICartSliceState, ICartItem } from './types';

const cartData = getCartFromLS();

const initialState: ICartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<ICartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItems(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem && findItem.count > 1) {
        findItem.count--;
        state.totalPrice = calcTotalPrice(state.items);
      }
    }
  },
});

export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

export const selectCart = (state: RootState) => state.cart;

export const { addItems, removeItems, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;