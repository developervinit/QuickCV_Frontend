// src/components/resumeForm/schemas/step5ProjectsSchema.js
import * as yup from 'yup';

export const step5ProjectsSchema = yup.object({
  projects: yup.array().of(
    yup.object({
      id: yup.string().required(),
      projectName: yup.string().nullable(),
      description: yup.string().nullable(),
      techStack: yup.string().nullable(),
      tools: yup.string().nullable(),
      githubLink: yup.string().nullable().url('Enter a valid URL'),
      projectLink: yup.string().nullable().url('Enter a valid URL'),
      completionDate: yup.string().nullable(),

      // Updated from single "role" string to multiple "roles" array
      roles: yup
        .array()
        .of(yup.string().required())
        .min(1, 'Please select at least one role')
        .required('Please select at least one role'),
    })
  ),
});
