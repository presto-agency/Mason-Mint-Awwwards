import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 characters')
    .max(12, 'Phone number must not exceed 12 characters'),
  message: Yup.string().required('Message is required'),
  companyName: Yup.string().required('Company name is required'),
  companyAddress: Yup.string().required('Company address is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  postalCode: Yup.string()
    .matches(/^\d+$/, 'Postal code must contain only digits')
    .required('Postal code is required'),
  state: Yup.string().required('Please select an option'),
  website: Yup.string()
    .required('Website is required')
    .matches(/\..+/, 'Website address is not correct'),
})
