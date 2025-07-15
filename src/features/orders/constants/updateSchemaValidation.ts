import * as Yup from 'yup';

export const validationSchema = Yup.object({
  client: Yup.string().required("Ім'я обов'язкове"),
  status: Yup.string().required('Статус обов’язковий'),
  date: Yup.string()
    .required('Дата обов’язкова')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Дата повинна бути в форматі ГГГГ-ММ-ДД'),
  total: Yup.number().required('Сума обов’язкова').min(0, 'Сума не може бути від’ємною'),
});