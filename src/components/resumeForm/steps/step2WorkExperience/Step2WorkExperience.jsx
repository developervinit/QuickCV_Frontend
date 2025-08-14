// src/components/resumeForm/steps/step2WorkExperience/Step2WorkExperience.jsx
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { step2WorkExperienceSchema } from '../../schemas/step2WorkExperienceSchema';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setWorkExperience, setCurrentStep } from '../../../../features/resumeForm/resumeFormSlice';
import FormInput from '../../components/formInput/FormInput';
import FormTextArea from '../../components/formTextArea/FormTextArea';
import StepNavigation from '../../components/stepNavigation/StepNavigation';
import styles from './Step2WorkExperience.module.css';

const getEmptyEntry = () => ({
  id: uuidv4(),
  jobTitle: '',
  coreRoleSkills: '',
  softSkills: '',
  company: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  responsibilities: '',
  techStack: '',
  tools: '',
  projectStory: ''
});

const Step2WorkExperience = () => {
  const dispatch = useDispatch();
  const persisted = useSelector((state) => state.resumeForm.workExperience || []);
  const currentStepFromStore = useSelector((s) => s.resumeForm.ui.currentStep);

  // default values - persist or create a single empty entry
  const defaultValues = {
    workExperience: (persisted.length > 0 ? persisted : [getEmptyEntry()])
  };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(step2WorkExperienceSchema)
  });

  console.log(isValid);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'workExperience',
    keyName: 'rhfId' // avoid conflict with our id
  });

  // UI state: which entry is expanded (open)
  const [openIndex, setOpenIndex] = useState(0);

  // watch array to handle endDate/currentlyWorking toggles
  const watchedEntries = watch('workExperience');

  // ensure mutual exclusivity between endDate and currentlyWorking for each entry
  useEffect(() => {
    watchedEntries.forEach((entry, idx) => {
      if (!entry) return;
      const endDate = entry.endDate;
      const currentlyWorking = entry.currentlyWorking;

      if (endDate && currentlyWorking) {
        // if both filled, prefer the endDate -> set currentlyWorking false
        setValue(`workExperience.${idx}.currentlyWorking`, false, { shouldValidate: true, shouldDirty: true });
      } else if (currentlyWorking && entry.endDate) {
        // just in case, clear endDate
        setValue(`workExperience.${idx}.endDate`, '', { shouldValidate: true, shouldDirty: true });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedEntries]);

  // Add new entry
  const handleAdd = () => {
    const newEntry = getEmptyEntry();
    append(newEntry);
    setOpenIndex(fields.length); // open the new one
  };

  // Remove entry
  const handleRemove = (index) => {
    // if removing currently open entry, adjust openIndex
    remove(index);
    if (openIndex >= index) {
      setOpenIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Collapse/expand entry
  const toggleOpen = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  // Save step and go to next
  const onSubmit = (data) => {
    // We are not converting comma-separated string fields to arrays before dispatching

    dispatch(setWorkExperience(data.workExperience));
    dispatch(setCurrentStep(3));
  };

  
  // Back to step 1
  const handleBack = () => {
    dispatch(setCurrentStep(1));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.formTitle}>Work Experience</h2>

      <div className={styles.list}>
        {fields.map((field, index) => {
          const title = (watchedEntries?.[index]?.jobTitle || '').trim();
          const company = (watchedEntries?.[index]?.company || '').trim();
          return (
            <div key={field.id} className={styles.card}>
              <div className={styles.cardHeader} onClick={() => toggleOpen(index)}>
                <div>
                  <div className={styles.cardTitle}>{title || 'New Role'}</div>
                  <div className={styles.cardSubtitle}>{company || 'Company'}</div>
                </div>
                <div className={styles.headerActions}>
                  <button type="button" className={styles.removeBtn} onClick={() => handleRemove(index)}>
                    Remove
                  </button>
                  <button type="button" className={styles.toggleBtn}>
                    {openIndex === index ? 'Collapse' : 'Edit'}
                  </button>
                </div>
              </div>

              {openIndex === index && (
                <div className={styles.cardBody}>
                  <FormInput label="Job Title (Role) *" {...register(`workExperience.${index}.jobTitle`)} error={errors?.workExperience?.[index]?.jobTitle?.message} />

                  <FormInput
                    label="Core Role Skills (comma separated) *"
                    placeholder="e.g. React, Node.js, SQL"
                    {...register(`workExperience.${index}.coreRoleSkills`)}
                    error={errors?.workExperience?.[index]?.coreRoleSkills?.message}
                  />

                  <FormInput
                    label="Soft Skills (comma separated)"
                    placeholder="e.g. Communication, Teamwork"
                    {...register(`workExperience.${index}.softSkills`)}
                    error={errors?.workExperience?.[index]?.softSkills?.message}
                  />

                  <FormInput label="Company Name" {...register(`workExperience.${index}.company`)} error={errors?.workExperience?.[index]?.company?.message} />

                  <div className={styles.row}>
                    <div className={styles.col}>
                      <label className={styles.smallLabel}>Start Date</label>
                      <input type="date" className={styles.inputDate} {...register(`workExperience.${index}.startDate`)} />
                    </div>

                    <div className={styles.col}>
                      <label className={styles.smallLabel}>End Date</label>
                      <input
                        type="date"
                        className={styles.inputDate}
                        {...register(`workExperience.${index}.endDate`)}
                        disabled={Boolean(watchedEntries?.[index]?.currentlyWorking)}
                      />
                    </div>

                    <div className={styles.colCheck}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          {...register(`workExperience.${index}.currentlyWorking`)}
                          onChange={(e) => {
                            // If checked, clear endDate
                            const checked = e.target.checked;
                            setValue(`workExperience.${index}.currentlyWorking`, checked, { shouldValidate: true });
                            if (checked) {
                              setValue(`workExperience.${index}.endDate`, '', { shouldValidate: true });
                            }
                          }}
                        />
                        Currently working
                      </label>
                    </div>
                  </div>

                  <FormTextArea label="Responsibility / Achievements" {...register(`workExperience.${index}.responsibilities`)} error={errors?.workExperience?.[index]?.responsibilities?.message} />

                  <FormInput label="Tech Stack (comma separated)" placeholder="React, Node.js, PostgreSQL" {...register(`workExperience.${index}.techStack`)} />
                  <FormInput label="Tools (comma separated)" placeholder="Git, Docker, Jenkins" {...register(`workExperience.${index}.tools`)} />

                  <FormTextArea label="Project Story (Solved problem)" {...register(`workExperience.${index}.projectStory`)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.addRow}>
        <button type="button" className={styles.addBtn} onClick={handleAdd}>
          + Add another role
        </button>
      </div>

      <StepNavigation
        showBack={true}
        onBack={handleBack}
        onNext={handleSubmit(onSubmit)}
        nextLabel="Next"
        isNextDisabled={!isValid}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default Step2WorkExperience;
