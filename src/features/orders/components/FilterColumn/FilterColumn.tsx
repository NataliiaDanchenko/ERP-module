import React from 'react';

interface FilterProps {
  column: any;
  table: any;
}

const Filter: React.FC<FilterProps> = ({ column, table }) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const isNumber = typeof firstValue === 'number';

  return (
    <input
      type={isNumber ? 'number' : 'text'}
      value={column.getFilterValue() ?? ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder='Фільтр...'
      style={{ width: isNumber ? '70px' : '100px' }}
    />
  );
};

export default Filter;
