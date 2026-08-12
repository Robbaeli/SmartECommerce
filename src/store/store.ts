import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import userSlice from "./reducers/userSlice";
import { persistedCartSlice } from "./reducers/persistConfig";
import persistStore from "redux-persist/lib/persistStore";


const store =configureStore({
    reducer:{
        cartSlice: persistedCartSlice,
        userSlice: userSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export default store;