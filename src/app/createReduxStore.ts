import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "@/features/orders/redux/orderSlice";

export const createReduxStore = () => {
  return configureStore({
    reducer: {
      orders: ordersReducer,
    }
  })
}

export const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;