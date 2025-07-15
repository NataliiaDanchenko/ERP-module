import type { FC } from 'react';
import { OrderForm } from '@/features/orders/components/OrdersForm/OrdersForm';
import { OrdersTable } from '@/features/orders/components/OrdersTable/OrdersTable';

interface OrdersPageProps {}

export const OrdersPage: FC<OrdersPageProps> = ({}) => {
  return (
    <div style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <OrderForm />
      <OrdersTable />
    </div>
  );
};
