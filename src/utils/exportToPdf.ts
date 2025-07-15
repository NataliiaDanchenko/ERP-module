import pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from 'pdfmake/build/vfs_fonts';
import type { ColumnDef } from '@tanstack/react-table';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

import type { Order } from '@/features/orders/types/interfaces';
import { selectOptions } from '@/features/orders/constants/selectOptions';

pdfMake.vfs = vfs;

export const exportToPdf = (orders: Order[], columns: ColumnDef<Order>[]) => {
  const headers = columns.map((col) =>
    typeof col.header === 'string' ? col.header : ''
  );

  const body = [
    headers.map((h) => ({
      text: h,
      style: 'tableHeader',
      alignment: 'center',
    })),
    ...orders.map((order) =>
      columns.map((col) => {
        const colWithAccessorKey = col as {
          accessorKey?: keyof Order;
          accessorFn?: (row: Order) => any;
        };

        let value = '';

        if (colWithAccessorKey.accessorKey) {
          const key = colWithAccessorKey.accessorKey;
          const raw = order[key];

          if (key === 'status' && typeof raw === 'string') {
            value = selectOptions[raw as Order['status']] || raw;
          } else if (key === 'total' && typeof raw === 'number') {
            value = `${raw.toFixed(2)} UAH`;
          } else if (key === 'date' && typeof raw === 'string') {
            const date = new Date(raw);
            value = isNaN(date.getTime())
              ? raw
              : date.toLocaleDateString('uk-UA'); 
          } else {
            value = raw !== undefined && raw !== null ? String(raw) : '';
          }
        } else if (colWithAccessorKey.accessorFn) {
          const raw = colWithAccessorKey.accessorFn(order);
          value = raw !== undefined && raw !== null ? String(raw) : '';
        }

        return {
          text: value,
          alignment: 'left',
        };
      })
    ),
  ];

  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60] as [number, number, number, number],
    content: [
      {
        text: 'Замовлення',
        style: 'header',
      },
      {
        table: {
          headerRows: 1,
          widths: headers.map((_, index) => {
            const header = headers[index].toLowerCase();
            if (header.includes('номер') || header.includes('id')) return 40;
            if (header.includes('сума') || header.includes('total')) return 100;
            if (header.includes('статус')) return 80;
            return '*';
          }),
          body,
        },
        layout: {
          fillColor: () => null,
          hLineColor: () => '#000000',
          vLineColor: () => '#000000',
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          paddingLeft: () => 6,
          paddingRight: () => 6,
          paddingTop: () => 4,
          paddingBottom: () => 4,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,
        marginBottom: 20,
        alignment: 'center',
      },
      tableHeader: {
        fontSize: 12,
        bold: true,
        color: '#000000',
      },
    },
    defaultStyle: {
      fontSize: 10,
      color: '#000000',
    },
  };

  pdfMake.createPdf(docDefinition).open();
};


