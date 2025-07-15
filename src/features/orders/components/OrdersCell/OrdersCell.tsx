import { type ReactNode } from 'react';

interface OrderCellProps {
  children: ReactNode;
  label?: string;
}

export const OrderCell = ({ children, label }: OrderCellProps) => {
  return (
    <td
      data-label={label}
      style={{ padding: '8px', borderBottom: '1px solid #ccc' }}
    >
      {children}
    </td>
  );
};
