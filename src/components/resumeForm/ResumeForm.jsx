import React from 'react';
import { useSelector } from 'react-redux';
import Step1PersonalInfo from './steps/step1PersonalInfo/Step1PersonalInfo';
import styles from './ResumeForm.module.css';

const ResumeForm = () => {
  const currentStep = useSelector((state) => state.resumeForm.ui.currentStep);

  return (
    <div className={styles.formContainer}>
      {/* progress UI can be added here using currentStep */}
      {currentStep === 1 && <Step1PersonalInfo />}
      {/* later: render step 2..6 accordingly */}
    </div>
  );
};

export default ResumeForm;
