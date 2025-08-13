// src/components/resumeForm/steps/step3Education/Step3Education.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { step3EducationSchema } from '../../schemas/step3EducationSchema';
import styles from './Step3Education.module.css';

import StepNavigation from '../../components/stepNavigation/StepNavigation';
import {
  setEducation,
  setCurrentStep,
} from '../../../../features/resumeForm/resumeFormSlice';

const emptyEdu = () => ({
  id: uuidv4(),
  degree: '',
  university: '',
  startDate: '',
  endDate: '',
  percentageCgpa: '',
  specialization: '',
});

const Step3Education = () => {
  const dispatch = useDispatch();
  const stored = useSelector((s) => s.resumeForm.education);

  // default to one expanded card if empty
  const defaults = useMemo(
    () => ({
      education: stored && stored.length > 0 ? stored : [emptyEdu()],
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
    resolver: yupResolver(step3EducationSchema),
    defaultValues: defaults,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  // expanded index state (start with 0 on first visit)
  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    if (stored?.length > 0) setExpandedIndex(0);
  }, [stored]);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleAdd = () => {
    const item = emptyEdu();
    const newIndex = fields.length;
    append(item);
    setValue(`education.${newIndex}.id`, item.id);
    setExpandedIndex(newIndex); // expand the newly added card
  };

  const onBack = () => {
    // persist current (even if partial) then go back to Step 2
    const data = getValues();
    dispatch(setEducation(normalizeEducation(data.education)));
    dispatch(setCurrentStep(2));
  };

  const onNext = (data) => {
    const normalized = normalizeEducation(data.education);
    dispatch(setEducation(normalized));
    dispatch(setCurrentStep(4)); // proceed to Step-4
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      {fields.map((field, index) => {
        const title =
          watch(`education.${index}.degree`) ||
          watch(`education.${index}.university`) ||
          'Untitled Education';

        // unique ids for labels
        const idPrefix = field.id || `edu-${index}`;
        const ids = {
          degree: `${idPrefix}-degree`,
          university: `${idPrefix}-university`,
          startDate: `${idPrefix}-startDate`,
          endDate: `${idPrefix}-endDate`,
          percentage: `${idPrefix}-percentage`,
          specialization: `${idPrefix}-specialization`,
        };

        return (
          <div key={field.id} className={styles.educationCard}>
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
                {/* hidden id to keep stable identity */}
                <input type="hidden" {...register(`education.${index}.id`)} />

                <div className={styles.row}>
                  <div>
                    <label htmlFor={ids.degree}>Degree / Course / Diploma</label>
                    <input
                      id={ids.degree}
                      className={styles.input}
                      type="text"
                      placeholder="e.g., B.Tech in CSE"
                      {...register(`education.${index}.degree`)}
                    />
                  </div>

                  <div>
                    <label htmlFor={ids.university}>University / Board</label>
                    <input
                      id={ids.university}
                      className={styles.input}
                      type="text"
                      placeholder="e.g., ABC University"
                      {...register(`education.${index}.university`)}
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
                      {...register(`education.${index}.startDate`)}
                    />
                    {errors?.education?.[index]?.startDate?.message && (
                      <small>
                        {errors.education[index].startDate.message}
                      </small>
                    )}
                  </div>

                  <div>
                    <label htmlFor={ids.endDate}>End Date</label>
                    <input
                      id={ids.endDate}
                      className={styles.input}
                      type="date"
                      {...register(`education.${index}.endDate`)}
                    />
                    {errors?.education?.[index]?.endDate?.message && (
                      <small>{errors.education[index].endDate.message}</small>
                    )}
                  </div>
                </div>

                <div className={styles.row}>
                  <div>
                    <label htmlFor={ids.percentage}>Percentage / CGPA</label>
                    <input
                      id={ids.percentage}
                      className={styles.input}
                      type="text"
                      placeholder="e.g., 8.2 CGPA or 82%"
                      {...register(`education.${index}.percentageCgpa`)}
                    />
                  </div>

                  <div>
                    <label htmlFor={ids.specialization}>
                      Specialization / Subjects
                    </label>
                    <input
                      id={ids.specialization}
                      className={styles.input}
                      type="text"
                      placeholder="e.g., Data Structures, Algorithms"
                      {...register(`education.${index}.specialization`)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add another education at bottom */}
      <button
        type="button"
        onClick={handleAdd}
        className={styles.addButton}
      >
        + Add another education
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
function normalizeEducation(list = []) {
  return list
    .map((e) => ({
      id: e.id || uuidv4(),
      degree: e.degree?.trim() || '',
      university: e.university?.trim() || '',
      startDate: e.startDate || '',
      endDate: e.endDate || '',
      percentageCgpa: e.percentageCgpa?.trim() || '',
      specialization: e.specialization?.trim() || '',
    }))
    .filter((e) =>
      [e.degree, e.university, e.startDate, e.endDate, e.percentageCgpa, e.specialization]
        .some((v) => !!v)
    );
}

export default Step3Education;
