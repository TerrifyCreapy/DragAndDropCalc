import {configureStore} from "@reduxjs/toolkit";
import {calculatorReducer} from "./Slices/Calculator";


const store = configureStore({
    reducer: {
        calculator: calculatorReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
