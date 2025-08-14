// src/components/resumeForm/ResumeForm.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Step1PersonalInfo from './steps/step1PersonalInfo/Step1PersonalInfo';
import Step2WorkExperience from './steps/step2WorkExperience/Step2WorkExperience';
import Step3Education from './steps/step3Education/Step3Education';
import Step4Certifications from './steps/step4Certifications/Step4Certifications';
import Step5Projects from './steps/step5Projects/Step5Projects';
import Step6Languages from './steps/step6Languages/Step6Languages';

import styles from './ResumeForm.module.css';
import { setCurrentStep, resetForm } from '../../features/resumeForm/resumeFormSlice';
import StepIndicator from './components/stepIndicator/StepIndicator';
import axios from '../../services/axiosInstance'; // your axios instance

const toArrayFromComma = (str) =>
  String(str || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const ResumeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.resumeForm.ui.currentStep);
  const resumeState = useSelector((state) => state.resumeForm);

  // Final submit handler - collects redux state and sends to backend
  const handleFinalSubmit = async () => {

    //Normalizing step-2 data from comma separated value to array.
    const normalized = resumeState.workExperience.map((we) => ({
          ...we,
          coreRoleSkills: toArrayFromComma(we.coreRoleSkills),
          softSkills: toArrayFromComma(we.softSkills),
          techStack: toArrayFromComma(we.techStack),
          tools: toArrayFromComma(we.tools)
        }));

    try {
      const payload = {
        personalInfo: resumeState.personalInfo,
        workExperience: normalized,
        education: resumeState.education,
        certifications: resumeState.certifications,
        projects: resumeState.projects,
        languages: resumeState.languages,
      };

      console.log(payload);

      // adjust endpoint as needed
      // const res = await axios.post('/api/resume', payload);

      toast.success('Resume saved successfully');

      // This is to reset the form. we will not reset the form on submitting it. 
      // dispatch(resetForm());

      // Optionally navigate to resume list / preview page
      // navigate('/resume-list');
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || 'Failed to submit resume. Please try again.'
      );
    }
  };

  return (
    <>
    <StepIndicator />
    <div className={styles.formContainer}>
      {currentStep === 1 && <Step1PersonalInfo />}
      {currentStep === 2 && <Step2WorkExperience />}
      {currentStep === 3 && <Step3Education />}
      {currentStep === 4 && <Step4Certifications />}
      {currentStep === 5 && <Step5Projects />}
      {currentStep === 6 && <Step6Languages onSubmitAll={handleFinalSubmit} />}
    </div>
    </>
  );
};

export default ResumeForm;
