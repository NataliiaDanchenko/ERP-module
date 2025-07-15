import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import type { AppDispatch, RootState } from '@/app/createReduxStore';

import { addOrder } from '@/features/orders/redux/orderSlice';

import { validationSchema } from '@/features/orders/constants/addSchemaValidationForm';
import { selectOptions } from '@/features/orders/constants/selectOptions';

import { type Order } from '@/features/orders/types/interfaces';

import styles from './OrderForm.module.scss';

export const OrderForm = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      name: '',
      status: 'new',
      date: '',
      total: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      const newOrder: Order = {
        id: (orders.length + 1).toString(),
        client: values.name,
        date: values.date,
        status: values.status as Order['status'],
        total: Number(values.total),
      };
      dispatch(addOrder(newOrder));
      alert('Order added:\n' + JSON.stringify(newOrder, null, 2));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <div className='error'>{formik.errors.name}</div>
        )}
      </div>
      <div>
        <label htmlFor='status'>Status</label>
        <select
          id='status'
          name='status'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.status}
        >
          {Object.entries(selectOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {formik.touched.status && formik.errors.status && (
          <div className='error'>{formik.errors.status}</div>
        )}
      </div>
      <div>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          name='date'
          type='date'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date || ''}
        />
        {formik.touched.date && formik.errors.date && (
          <div className='error'>{formik.errors.date}</div>
        )}
      </div>
      <div>
        <label htmlFor='total'>Total</label>
        <input
          id='total'
          name='total'
          type='number'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.total}
        />
        {formik.touched.total && formik.errors.total && (
          <div className='error'>{formik.errors.total}</div>
        )}
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};
