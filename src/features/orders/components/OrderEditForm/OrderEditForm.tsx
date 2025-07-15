import { useFormik } from 'formik';

import type { Order } from '@/features/orders/types/interfaces';

import { validationSchema } from '@/features/orders/constants/updateSchemaValidation';
import { selectOptions } from '@/features/orders/constants/selectOptions';

import styles from './OrderEditForm.module.scss';

interface OrderFormProps {
  initialValues: Order;
  onSave: (order: Order) => void;
  onCancel?: () => void;
}

export const OrderEditForm = ({
  initialValues,
  onSave,
  onCancel,
}: OrderFormProps) => {
  const formik = useFormik({
    initialValues: {
      client: initialValues.client,
      status: initialValues.status,
      date: initialValues.date,
      total: initialValues.total,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      onSave({
        ...initialValues,
        client: values.client,
        status: values.status,
        date: values.date,
        total: Number(values.total),
      });
    },
  });

  const handleSubmitClick = () => {
    console.log('Save button clicked');
    formik.submitForm(); 
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div>
        <label htmlFor='client'>Client</label>
        <input
          id='client'
          name='client'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.client}
        />
        {formik.touched.client && formik.errors.client && (
          <div className='error'>{formik.errors.client}</div>
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
          value={formik.values.date}
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

      <button type='submit' onClick={handleSubmitClick}>
        Save
      </button>
      {onCancel && (
        <button type='button' onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};
