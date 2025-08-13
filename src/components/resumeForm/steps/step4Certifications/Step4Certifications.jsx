// src/components/resumeForm/steps/step4Certifications/Step4Certifications.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { step4CertificationsSchema } from '../../schemas/step4CertificationsSchema';
import styles from './Step4Certifications.module.css';

import StepNavigation from '../../components/stepNavigation/StepNavigation';
import {
  setCertifications,
  setCurrentStep,
} from '../../../../features/resumeForm/resumeFormSlice';

const emptyCert = () => ({
  id: uuidv4(),
  title: '',
  provider: '',
  startDate: '',
  endDate: '',
  certificateUrl: '',
  description: '',
});

const Step4Certifications = () => {
  const dispatch = useDispatch();
  const stored = useSelector((s) => s.resumeForm.certifications);

  // default to one expanded card if empty
  const defaults = useMemo(
    () => ({
      certifications: stored && stored.length > 0 ? stored : [emptyCert()],
    }),
    [stored]
  );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step4CertificationsSchema),
    defaultValues: defaults,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications',
  });

  // expanded index (start with 0 on first visit)
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    if (stored?.length > 0) setExpandedIndex(0);
  }, [stored]);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleAdd = () => {
    const item = emptyCert();
    const newIndex = fields.length;
    append(item);
    setValue(`certifications.${newIndex}.id`, item.id);
    setExpandedIndex(newIndex); // expand the newly added card
  };

  const onBack = () => {
    // persist current (even if partial) then go back to Step 3
    const data = getValues();
    dispatch(setCertifications(normalizeCertifications(data.certifications)));
    dispatch(setCurrentStep(3));
  };

  const onNext = (data) => {
    const normalized = normalizeCertifications(data.certifications);
    dispatch(setCertifications(normalized));
    dispatch(setCurrentStep(5)); // proceed to Step-5
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      {fields.map((field, index) => {
        const title =
          watch(`certifications.${index}.title`) ||
          watch(`certifications.${index}.provider`) ||
          'Untitled Certification';

        const idPrefix = field.id || `cert-${index}`;
        const ids = {
          title: `${idPrefix}-title`,
          provider: `${idPrefix}-provider`,
          startDate: `${idPrefix}-startDate`,
          endDate: `${idPrefix}-endDate`,
          url: `${idPrefix}-url`,
          description: `${idPrefix}-description`,
        };

        return (
          <div key={field.id} className={styles.certificationCard}>
            <div
              className={styles.cardHeader}
              onClick={() => handleToggle(index)}
            >
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.headerActions}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(index);
                  }}
                >
                  {expandedIndex === index ? 'Collapse' : 'Edit'}
                </button>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                      if (expandedIndex === index) setExpandedIndex(null);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {expandedIndex === index && (
              <div className={styles.cardBody}>
                {/* keep id stable */}
                <input type="hidden" {...register(`certifications.${index}.id`)} />

                <div className={styles.row}>
                  <div>
                    <label htmlFor={ids.title}>Title</label>
                    <input
                      id={ids.title}
                      className={styles.input}
                      type="text"
                      placeholder="e.g., AWS Certified Developer"
                      {...register(`certifications.${index}.title`)}
                    />
                  </div>

                  <div>
                    <label htmlFor={ids.provider}>Provider</label>
                    <input
                      id={ids.provider}
                      className={styles.input}
                      type="text"
                      placeholder="e.g., Amazon Web Services"
                      {...register(`certifications.${index}.provider`)}
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div>
                    <label htmlFor={ids.startDate}>Start Date</label>
                    <input
                      id={ids.startDate}
                      className={styles.input}
                      type="date"
                      {...register(`certifications.${index}.startDate`)}
                    />
                    {errors?.certifications?.[index]?.startDate?.message && (
                      <small>{errors.certifications[index].startDate.message}</small>
                    )}
                  </div>

                  <div>
                    <label htmlFor={ids.endDate}>End Date</label>
                    <input
                      id={ids.endDate}
                      className={styles.input}
                      type="date"
                      {...register(`certifications.${index}.endDate`)}
                    />
                    {errors?.certifications?.[index]?.endDate?.message && (
                      <small>{errors.certifications[index].endDate.message}</small>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor={ids.url}>Certificate URL</label>
                  <input
                    id={ids.url}
                    className={styles.input}
                    type="url"
                    placeholder="https://..."
                    {...register(`certifications.${index}.certificateUrl`)}
                  />
                  {errors?.certifications?.[index]?.certificateUrl?.message && (
                    <small>{errors.certifications[index].certificateUrl.message}</small>
                  )}
                </div>

                <div>
                  <label htmlFor={ids.description}>Description</label>
                  <input
                    id={ids.description}
                    className={styles.input}
                    type="text"
                    placeholder="Short description (optional)"
                    {...register(`certifications.${index}.description`)}
                  />
                  {errors?.certifications?.[index]?.description?.message && (
                    <small>{errors.certifications[index].description.message}</small>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add another certification at the bottom */}
      <button type="button" onClick={handleAdd} className={styles.addButton}>
        + Add another certification
      </button>

      {/* Back / Next beneath the add button */}
      <div className={styles.footer}>
        <StepNavigation
          showBack={true}
          onBack={onBack}
          onNext={handleSubmit(onNext)}
          backLabel="Back"
          nextLabel="Next"
        />
      </div>
    </form>
  );
};

// Normalize and remove completely empty entries, keep ids stable
function normalizeCertifications(list = []) {
  return (list || [])
    .map((c) => ({
      id: c.id || uuidv4(),
      title: c.title?.trim() || '',
      provider: c.provider?.trim() || '',
      startDate: c.startDate || '',
      endDate: c.endDate || '',
      certificateUrl: c.certificateUrl?.trim() || '',
      description: c.description?.trim() || '',
    }))
    .filter((c) => [c.title, c.provider, c.startDate, c.endDate, c.certificateUrl, c.description].some(Boolean));
}

export default Step4Certifications;
