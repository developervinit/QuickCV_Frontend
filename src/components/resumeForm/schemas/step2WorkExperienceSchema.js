import * as yup from 'yup';

export const workEntrySchema = yup.object().shape({
  id: yup.string().required(),
  jobTitle: yup.string().trim().required('Job title is required'),
  coreRoleSkills: yup
    .string()
    .trim()
    .required('Core role skills are required (comma separated)'),
  softSkills: yup.string().trim().nullable(),
  company: yup.string().trim().nullable(),
  startDate: yup.string().nullable(),
  endDate: yup.string().nullable(),
  currentlyWorking: yup.boolean(),
  responsibilities: yup.string().trim().nullable(),
  techStack: yup.string().trim().nullable(),
  tools: yup.string().trim().nullable(),
  projectStory: yup.string().trim().nullable()
});

export const step2WorkExperienceSchema = yup.object().shape({
  workExperience: yup.array().of(workEntrySchema).min(1, 'Add at least one role')
});
