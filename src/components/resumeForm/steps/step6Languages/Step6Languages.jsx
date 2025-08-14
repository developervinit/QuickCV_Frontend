// src/components/resumeForm/steps/step6Languages/Step6Languages.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { step6LanguagesSchema } from '../../schemas/step6LanguagesSchema';
import styles from './Step6Languages.module.css';

import StepNavigation from '../../components/stepNavigation/StepNavigation';
import {
  setLanguages,
  setCurrentStep,
} from '../../../../features/resumeForm/resumeFormSlice';

const useEmptyLanguage = () =>
  useMemo(
    () => ({
      id: uuidv4(),
      languageName: '',
      proficiency: '',
    }),
    []
  );

const Step6Languages = ({ onSubmitAll }) => {
  const dispatch = useDispatch();
  const stored = useSelector((s) => s.resumeForm.languages);
  const emptyLanguage = useEmptyLanguage();

  const defaults = useMemo(
    () => ({ languages: stored && stored.length > 0 ? stored : [emptyLanguage] }),
    [stored, emptyLanguage]
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
    resolver: yupResolver(step6LanguagesSchema),
    defaultValues: defaults,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    if (stored?.length > 0) setExpandedIndex(0);
  }, [stored]);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleAdd = () => {
    const item = { ...emptyLanguage, id: uuidv4() };
    const newIndex = fields.length;
    append(item);
    setValue(`languages.${newIndex}.id`, item.id);
    setExpandedIndex(newIndex);
  };

  const onBack = () => {
    // persist current (even if partial) then go back to Step 5
    const data = getValues();
    dispatch(setLanguages(normalizeLanguages(data.languages)));
    dispatch(setCurrentStep(5));
  };

  // On submit: persist languages and call parent handler to submit full payload
  const onSubmit = (data) => {
    const normalized = normalizeLanguages(data.languages);
    dispatch(setLanguages(normalized));

    // call parent handler that will collect all redux state and perform final API submit
    if (typeof onSubmitAll === 'function') {
      onSubmitAll();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <h2 className={styles.heading}>Step 6 — Languages</h2>
      <p className={styles.subheading}>
        Add languages you know and your proficiency. You can add multiple languages.
      </p>

      <div className={styles.list}>
        {fields.map((field, index) => {
          const title =
            watch(`languages.${index}.languageName`) || 'Untitled Language';

          const idPrefix = field.id || `lang-${index}`;
          const ids = {
            languageName: `${idPrefix}-name`,
            proficiency: `${idPrefix}-proficiency`,
          };

          return (
            <div key={field.id} className={styles.card}>
              <div
                className={styles.cardHeader}
                onClick={() => handleToggle(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' ? handleToggle(index) : null)}
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
                  <input type="hidden" {...register(`languages.${index}.id`)} />

                  <div className={styles.row}>
                    <div>
                      <label htmlFor={ids.languageName}>Language Name</label>
                      <input
                        id={ids.languageName}
                        className={styles.input}
                        type="text"
                        placeholder="e.g., English"
                        {...register(`languages.${index}.languageName`)}
                      />
                    </div>

                    <div>
                      <label htmlFor={ids.proficiency}>Proficiency Level</label>
                      <select
                        id={ids.proficiency}
                        className={styles.input}
                        {...register(`languages.${index}.proficiency`)}
                      >
                        <option value="">Select</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  {errors?.languages?.[index] && (
                    <small className={styles.error}>
                      {JSON.stringify(errors.languages[index])}
                    </small>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.footerRow}>
        <button type="button" className={styles.addBtn} onClick={handleAdd}>
          + Add another language
        </button>
      </div>

      <div className={styles.footer}>
        <StepNavigation
          showBack={true}
          onBack={onBack}
          // onNext will be the submit for the final step
          onNext={handleSubmit(onSubmit)}
          backLabel="Back"
          nextLabel="Submit"
          isSubmitting={false}
        />
      </div>
    </form>
  );
};

// normalize languages: remove completely empty entries, keep ids stable
function normalizeLanguages(list = []) {
  return (list || [])
    .map((l) => ({
      id: l.id || uuidv4(),
      languageName: l.languageName?.trim() || '',
      proficiency: l.proficiency || '',
    }))
    .filter((l) => [l.languageName, l.proficiency].some(Boolean));
}

export default Step6Languages;
