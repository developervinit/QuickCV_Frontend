// src/components/resumeForm/ResumeForm.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Step1PersonalInfo from './steps/step1PersonalInfo/Step1PersonalInfo';
import Step2WorkExperience from './steps/step2WorkExperience/Step2WorkExperience';
import Step3Education from './steps/step3Education/Step3Education';
import styles from './ResumeForm.module.css';

const ResumeForm = () => {
  const currentStep = useSelector((state) => state.resumeForm.ui.currentStep);

  return (
    <div className={styles.formContainer}>
      {currentStep === 1 && <Step1PersonalInfo />}
      {currentStep === 2 && <Step2WorkExperience />}
      {currentStep === 3 && <Step3Education />}
      {/* later: render step 3..6 accordingly */}
    </div>
  );
};

export default ResumeForm;
