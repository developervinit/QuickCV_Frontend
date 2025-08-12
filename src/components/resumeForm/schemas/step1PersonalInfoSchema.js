// src/components/resumeForm/schemas/step1PersonalInfoSchema.js
import * as yup from 'yup';

const PHONE_REGEX = /^\+?[0-9\s\-]{7,15}$/;

export const step1PersonalInfoSchema = yup.object().shape({
  fullName: yup.string().trim().required('Full name is required').min(2, 'Too short'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  phone: yup.string().trim().required('Phone number is required').matches(PHONE_REGEX, 'Enter a valid phone number'),
  countryCode: yup.string().required('Country is required'),
  stateCode: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  linkedin: yup.string().trim().url('Enter a valid URL').nullable().notRequired(),
  website: yup.string().trim().url('Enter a valid URL').nullable().notRequired(),
  summary: yup.string().max(1000, 'Max 1000 characters').nullable(),
  profileImageDataUrl: yup.string().nullable() // base64 string (optional)
});
