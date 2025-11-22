// src/components/resumeForm/schemas/step3EducationSchema.js
import * as yup from 'yup';

export const step3EducationSchema = yup.object({
  education: yup.array().of(
    yup.object({
      id: yup.string().nullable(), // keep id if present
      degree: yup.string().nullable(),
      university: yup.string().nullable(),
      startDate: yup.string().nullable(),
      endDate: yup.string().nullable(),
      percentageCgpa: yup.string().nullable(),
      specialization: yup.string().nullable(),
    })
  ),
});
