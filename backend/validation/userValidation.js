import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(2, 'Min 2 characters').required('Password required')
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(2, 'Min 2 characters').required('Password required')
});