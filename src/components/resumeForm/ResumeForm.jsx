// src/components/resumeForm/ResumeForm.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Step1PersonalInfo from './steps/step1PersonalInfo/Step1PersonalInfo';
import Step2WorkExperience from './steps/step2WorkExperience/Step2WorkExperience';
import styles from './ResumeForm.module.css';

const ResumeForm = () => {
  const currentStep = useSelector((state) => state.resumeForm.ui.currentStep);

  return (
    <div className={styles.formContainer}>
      {currentStep === 1 && <Step1PersonalInfo />}
      {currentStep === 2 && <Step2WorkExperience />}
      {/* later: render step 3..6 accordingly */}
    </div>
  );
};

export default ResumeForm;
