import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import userSlice from "./reducers/userSlice";


const store =configureStore({
    reducer:{
        cartSlice: cartSlice,
        userSlice: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;