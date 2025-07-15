import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Zа-щьюяєіїґА-ЩЬЮЯЄІЇҐ\s'-]+$/, 'Ім\'я повинне містити лише літери')
    .required('Ім\'я обов\'язкове'),
  total: Yup.number()
    .min(1, 'Сума не може бути меншою за 1')
    .required('Сума обов\'язкова'),
  status: Yup.string()
    .oneOf(['new', 'in_progress', 'completed', 'cancelled'], 'Недопустимий статус')
    .required('Статус обов\'язковий'),
  date: Yup.string()
    .required('Дата обов\'язкова'),
});


