import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  uniqueKey: string;
  id: number;
  product_id: string;
  name: string;
  quantity: number;
  attributes: { [key: string]: string };
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") as string) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) => item.uniqueKey === newItem.uniqueKey
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    plusQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    minusQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateAttribute: (state, action) => {
      const { id, attributeName, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.attributes[attributeName] = value;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
