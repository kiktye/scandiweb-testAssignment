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
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // const { id, product_id, quantity, attributes } = action.payload;
      const newItem = action.payload;

      const existingItem = state.items.find((item) => item.uniqueKey === newItem.uniqueKey);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      // const indexProduct = state.items.findIndex(
      //   (item) => item.id === id && item.product_id === product_id
      // );

      // if (indexProduct >= 0) {
      //   state.items[indexProduct].quantity += quantity;
      // } else {
      //   state.items.push({
      //     id,
      //     product_id,
      //     quantity,
      //     attributes,
      //   });
      // }
    },
    plusQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    minusQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateAttribute: (state, action) => {
      const { id, attributeName, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.attributes[attributeName] = value;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
