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
    // handles add to cart functionality (with quantity(no duplicates) and attributes)
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
    // handles quantity increment and decrement
    plusQuantity: (state, action) => {
      const item = state.items.find((item) => item.uniqueKey === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    minusQuantity: (state, action) => {
      const item = state.items.find((item) => item.uniqueKey === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.uniqueKey !== action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    // if quantity is 1, and user decreases one more, it removes the item
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.uniqueKey !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    // from cart, user can update attributes (because if i add a product with quick-shop, it has default attributes and i want to change them?)-my thinking
    updateAttribute: (state, action) => {
      const { id, attributeName, value } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.attributes[attributeName] = value;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    // when order is created, cart is emptied
    emptyCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, plusQuantity, minusQuantity, removeItem, updateAttribute, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
