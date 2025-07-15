import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeOrder, updateOrder } from '@/features/orders/redux/orderSlice';

import type { Order } from '@/features/orders/types/interfaces';

import { selectOptions } from '@/features/orders/constants/selectOptions';

import { OrderCell } from '@/features/orders/components/OrdersCell/OrdersCell';
import { OrderEditModal } from '@/features/orders/components/OrderEditModal/OrderEditModal';

interface OrdersRowProps {
  row: Order;
}

export const OrdersRow = ({ row }: OrdersRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeOrder({ id: row.id }));
  };

  const handleUpdate = (updatedOrder: Order) => {
    console.log('Dispatching updateOrder with:', updatedOrder);
    dispatch(updateOrder(updatedOrder));
    setIsModalOpen(false);
  };

  return (
    <>
      <tr>
        <OrderCell label='Номер'>{row.id}</OrderCell>
        <OrderCell label='Клієнт'>{row.client}</OrderCell>
        <OrderCell label='Дата'>
          {new Date(row.date).toLocaleDateString()}
        </OrderCell>
        <OrderCell label='Статус'>
          {selectOptions[row.status] || row.status}
        </OrderCell>
        <OrderCell label='Сума'>{row.total} ₴</OrderCell>
        <OrderCell>
          <button onClick={() => setIsModalOpen(true)}>Редагувати</button>
          <button style={{ marginLeft: '8px' }} onClick={handleDelete}>
            Видалити
          </button>
        </OrderCell>
      </tr>

      {isModalOpen && (
        <OrderEditModal
          order={row}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </>
  );
};
