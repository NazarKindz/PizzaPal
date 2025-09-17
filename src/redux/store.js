import { configureStore } from "@reduxjs/toolkit";

import filterSlice from '../redux/slices/filterSlice';
import cartSlice from '../redux/slices/cartSlice';
import pizzaSlice from '../redux/slices/pizzaSlice';

const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzaSlice
    }
});

export default store;