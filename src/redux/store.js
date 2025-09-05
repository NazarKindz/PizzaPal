import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../redux/slices/filterSlice';


const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});

export default store;