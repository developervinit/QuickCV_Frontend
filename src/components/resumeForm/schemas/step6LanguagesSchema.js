// src/components/resumeForm/schemas/step6LanguagesSchema.js
import * as yup from 'yup';

export const step6LanguagesSchema = yup.object({
  languages: yup.array().of(
    yup.object({
      id: yup.string().required(),
      languageName: yup.string().nullable(),
      proficiency: yup
        .string()
        .oneOf(['beginner', 'intermediate', 'expert', '', null])
        .nullable(),
    })
  ),
});
