import { configureStore } from '@reduxjs/toolkit';
import cart from './cartSlice';
import { api } from './api';

export const store = configureStore({
  reducer: { cart, [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
