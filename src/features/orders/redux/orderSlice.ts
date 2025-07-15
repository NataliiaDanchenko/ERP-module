import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import orderMock from '@/features/orders/data/mock.json';
import type { Order, OrderState } from '@/features/orders/types/interfaces';

const initialState: OrderState = {
  orders: orderMock as Order[],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    removeOrder(state, action: PayloadAction<{ id: string }>) {
      console.log('Видаляємо в слайсі', action.payload.id);
      state.orders = state.orders.filter((order) => order.id !== action.payload.id); 
    },
    updateOrder(state, action: PayloadAction<Order>) {
      const orderIndex = state.orders.findIndex((order) => order.id === action.payload.id);
      if (orderIndex !== -1) {
        state.orders[orderIndex] = {
          ...state.orders[orderIndex],
          ...action.payload,
          id: state.orders[orderIndex].id, 
        };
        console.log('After update:', state.orders);
      } else {
        console.log(`Замовлення з id ${action.payload.id} не знайдено`);
      }
    },
  },

})
  
export const { addOrder, removeOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
