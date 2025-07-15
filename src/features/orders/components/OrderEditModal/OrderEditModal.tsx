import type { Order } from '@/features/orders/types/interfaces';

import { Modal } from '@/components/Modal/Modal';
import { OrderEditForm } from '@/features/orders/components/OrderEditForm/OrderEditForm';

export interface EditOrderModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

export const OrderEditModal = ({
  order,
  isOpen,
  onClose,
  onSave,
}: EditOrderModalProps) => {
  if (!isOpen) return null;

  return (
    <Modal openModal={isOpen} setOpenModal={onClose}>
      <h2>Редагувати замовлення #{order.id}</h2>
      <OrderEditForm
        initialValues={{
          ...order,
          date: new Date(order.date).toISOString().split('T')[0],
        }}
        onSave={(updatedOrder) => {
          onSave(updatedOrder);
          onClose();
        }}
      />
    </Modal>
  );
};
