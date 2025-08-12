// src/components/resumeForm/steps/step1PersonalInfo/Step1PersonalInfo.jsx
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { step1PersonalInfoSchema } from '../../schemas/step1PersonalInfoSchema';
import { useDispatch, useSelector } from 'react-redux';
// import { setPersonalInfo, setCurrentStep } from '../../../features/resumeForm/resumeFormSlice';
import { setPersonalInfo, setCurrentStep } from '../../../../features/resumeForm/resumeFormSlice';
import FormInput from '../../components/formInput/FormInput';
import FormTextArea from '../../components/formTextArea/FormTextArea';
import FormSelect from '../../components/formSelect/FormSelect';
import StepNavigation from '../../components/stepNavigation/StepNavigation';
import styles from './Step1PersonalInfo.module.css';
import { Country, State, City } from 'country-state-city';

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });

const Step1PersonalInfo = () => {
  const dispatch = useDispatch();
  const persisted = useSelector((state) => state.resumeForm.personalInfo);

  const defaultValues = {
    fullName: persisted.fullName || '',
    email: persisted.email || '',
    phone: persisted.phone || '',
    countryCode: persisted.countryCode || '',
    stateCode: persisted.stateCode || '',
    city: persisted.city || '',
    linkedin: persisted.linkedin || '',
    website: persisted.website || '',
    summary: persisted.summary || '',
    profileImageDataUrl: persisted.profileImageDataUrl || null
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(step1PersonalInfoSchema)
  });

  // for country/state/city options
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const countries = Country.getAllCountries().map((c) => ({ value: c.isoCode, label: c.name }));
    setCountryOptions(countries);
  }, []);

  // watch countryCode, stateCode for dynamic loading
  const countryCode = watch('countryCode');
  const stateCode = watch('stateCode');

  useEffect(() => {
    if (countryCode) {
      const states = State.getStatesOfCountry(countryCode).map((s) => ({ value: s.isoCode, label: s.name }));
      setStateOptions(states);
    } else {
      setStateOptions([]);
    }
    // clear state & city when country changes
    setValue('stateCode', '');
    setValue('city', '');
  }, [countryCode, setValue]);

  useEffect(() => {
    if (countryCode && stateCode) {
      const cities = City.getCitiesOfState(countryCode, stateCode).map((c) => ({ value: c.name, label: c.name }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
    setValue('city', '');
  }, [countryCode, stateCode, setValue]);

  // profile image handling
  const [localPreview, setLocalPreview] = useState(defaultValues.profileImageDataUrl || null);
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // validation for size/type (max 2MB)
    const allowed = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowed.includes(file.type)) {
      alert('Only JPG/PNG images are allowed.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Max image size is 2MB.');
      return;
    }
    // convert to dataURL (base64) and set to form
    const dataUrl = await readFileAsDataUrl(file);
    setLocalPreview(dataUrl);
    setValue('profileImageDataUrl', dataUrl, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    // Save to redux
    dispatch(setPersonalInfo(data));
    // advance step (assume step 2)
    dispatch(setCurrentStep(2));
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.formTitle}>Personal Information</h2>

      <div className={styles.formRow}>
        <FormInput label="Full Name" {...register('fullName')} error={errors.fullName?.message} />
      </div>

      <div className={styles.formRow}>
        <FormInput label="Email" type="email" {...register('email')} error={errors.email?.message} />
      </div>

      <div className={styles.formRow}>
        <FormInput label="Phone Number" {...register('phone')} error={errors.phone?.message} />
      </div>

      <div className={styles.formRow}>
        <Controller
          name="countryCode"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="Country"
              options={countryOptions}
              value={countryOptions.find((o) => o.value === field.value) || null}
              onChange={(val) => field.onChange(val ? val.value : '')}
            />
          )}
        />
      </div>

      <div className={styles.formRow}>
        <Controller
          name="stateCode"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="State"
              options={stateOptions}
              value={stateOptions.find((o) => o.value === field.value) || null}
              onChange={(val) => field.onChange(val ? val.value : '')}
            />
          )}
        />
      </div>

      <div className={styles.formRow}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormSelect
              label="City"
              options={cityOptions}
              value={cityOptions.find((o) => o.value === field.value) || null}
              onChange={(val) => field.onChange(val ? val.value : '')}
            />
          )}
        />
      </div>

      <div className={styles.formRow}>
        <FormInput label="LinkedIn URL" {...register('linkedin')} error={errors.linkedin?.message} />
      </div>

      <div className={styles.formRow}>
        <FormInput label="Portfolio / Website URL" {...register('website')} error={errors.website?.message} />
      </div>

      <div className={styles.formRow}>
        <FormTextArea label="Career Objective / Summary" rows="6" {...register('summary')} error={errors.summary?.message} />
      </div>

      <div className={styles.formRow}>
        <label className={styles.label}>Profile Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {localPreview && (
          <div className={styles.imagePreview}>
            <img src={localPreview} alt="preview" className={styles.previewImg} />
          </div>
        )}
      </div>

      <StepNavigation
        showBack={false}
        onBack={null}
        onNext={handleSubmit(onSubmit)}
        isNextDisabled={!isValid}
        isSubmitting={isSubmitting}
        nextLabel="Next"
      />
    </form>
  );
};

export default Step1PersonalInfo;
