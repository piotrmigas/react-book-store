import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

type InitialState = {
  items: Book[];
  total: number;
  totalQuantity: number;
};

const initialState: InitialState = {
  items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') as string) : [],
  total: 0,
  totalQuantity: 0,
};

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Book>) => {
      const existingIndex = state.items.findIndex((item) => item.id === action.payload.id);

      if (existingIndex >= 0) {
        state.items[existingIndex] = {
          ...state.items[existingIndex],
          quantity: state.items[existingIndex].quantity + 1,
        };
      } else {
        const tempItem = { ...action.payload, quantity: 1 };
        state.items.push(tempItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    decreaseCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);

      if (state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
      } else if (state.items[itemIndex].quantity === 1) {
        const nextCartItems = state.items.filter((item) => item.id !== action.payload);

        state.items = nextCartItems;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<Book>) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          const nextCartItems = state.items.filter((item) => item.id !== item.id);

          state.items = nextCartItems;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        return state;
      });
    },
    getTotal: (state) => {
      let { total } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;

          return cartTotal;
        },
        {
          total: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.total = total;
    },
    getTotalQuantity: (state) => {
      const { quantity } = state.items.reduce(
        (cartTotal, cartItem) => {
          const { quantity } = cartItem;

          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          quantity: 0,
        }
      );

      state.totalQuantity = quantity;
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotal, getTotalQuantity, clearCart } = slice.actions;

export const selectCart = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) => state.cart.total;
export const selectTotalQuantity = (state: RootState) => state.cart.totalQuantity;

export default slice.reducer;
