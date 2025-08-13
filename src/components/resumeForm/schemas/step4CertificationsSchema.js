// src/components/resumeForm/schemas/step4CertificationsSchema.js
import * as yup from 'yup';

export const step4CertificationsSchema = yup.object().shape({
  certifications: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      title: yup.string().nullable(),
      provider: yup.string().nullable(),
      startDate: yup.string().nullable(),
      endDate: yup.string().nullable(),
      certificateUrl: yup.string().nullable().url('Enter a valid URL'),
      description: yup.string().nullable(),
    })
  ),
});
