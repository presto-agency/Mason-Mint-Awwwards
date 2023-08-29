import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  companyName: Yup.string().required('Company name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 characters')
    .max(12, 'Phone number must not exceed 12 characters'),
  location: Yup.string().required('Location is required'),
  message: Yup.string().required('Message is required'),
})
