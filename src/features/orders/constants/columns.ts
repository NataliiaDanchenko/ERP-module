import type { ColumnDef } from '@tanstack/react-table';
import type { Order } from '@/features/orders/types/interfaces';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Номер',
  },
  {
    accessorKey: 'client',
    header: 'Клієнт',
  },
  {
    accessorKey: 'date',
    header: 'Дата',
  },
  {
    accessorKey: 'status',
    header: 'Статус',
  },
  {
    accessorKey: 'total',
    header: 'Сума',
  },
]