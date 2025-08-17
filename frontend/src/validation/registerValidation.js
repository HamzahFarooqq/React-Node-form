import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(2, 'Min 2 characters').required('Password is required'),
});
