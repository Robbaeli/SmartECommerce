import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  imageURL: string;
  qty: number;
  sum: number;
}

interface cartState {
  items: CartItem[];
}

const initialState: cartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //addItemsToCart
    addItemsToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.qty += 1;
        existingItem.sum += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          qty: 1,
          sum: action.payload.price,
        });
      }
    },

    removeItemFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        if (existingItem.qty <= 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
        } else {
          existingItem.qty -= 1;
          existingItem.sum -= action.payload.price;
        }
      }
    },

    //removeproductFromCart
    removeProductFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    //emptyCart
    emptycart: (state) => {
        state.items = [];
    },
  },
});

export const { addItemsToCart, removeItemFromCart, removeProductFromCart, emptycart } =
  cartSlice.actions;
export default cartSlice.reducer;
