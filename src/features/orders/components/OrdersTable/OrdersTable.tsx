import { useState, type FC } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/createReduxStore';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnFiltersState,
  type SortingState,
  type PaginationState,
} from '@tanstack/react-table';
import { exportToPdf } from '@/utils/exportToPdf';
import { columns } from '@/features/orders/constants/columns';
import { OrdersRow } from '@/features/orders/components/OrdersRow/OrdersRow';
import FilterColumn from '@/features/orders/components/FilterColumn/FilterColumn';
import styles from './OrdersTable.module.scss';

interface OrdersTableProps {}

export const OrdersTable: FC<OrdersTableProps> = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className={styles.orderTable}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : undefined,
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                  {header.column.id !== 'id' && header.column.id !== 'total' ? (
                    <div style={{ marginRight: '8px' }}>
                      <FilterColumn column={header.column} table={table} />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <OrdersRow key={row.id} row={row.original} />
          ))}
        </tbody>
      </table>

      <div className={styles.formPagination}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Назад
        </button>{' '}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Вперед
        </button>{' '}
        <span>
          Сторінка{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} з {table.getPageCount()}
          </strong>{' '}
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Показати {pageSize}
            </option>
          ))}
        </select>
      </div>
      <button
        style={{ margin: '20px 42.5%' }}
        onClick={() =>
          exportToPdf(
            table.getFilteredRowModel().rows.map((r) => r.original),
            columns,
          )
        }
      >
        Експортувати в PDF
      </button>
    </div>
  );
};





