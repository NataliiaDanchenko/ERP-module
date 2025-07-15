export interface Order {
  id: string;
  client: string;
  date: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  total: number;
}

export interface OrderState {
  orders: Order[];
}

