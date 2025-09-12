import { configureStore } from "@reduxjs/toolkit";

import filterSlice from '../redux/slices/filterSlice';
import cartSlice from '../redux/slices/cartSlice';

const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice
    }
});

export default store;