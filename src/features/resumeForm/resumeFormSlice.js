// src/features/resumeForm/resumeFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    countryCode: '',
    stateCode: '',
    city: '',
    linkedin: '',
    website: '',
    summary: '',
    profileImageDataUrl: null,
  },
  workExperience: [],      // step 2
  education: [],           // step 3
  certifications: [],      // step 4
  projects: [],            // step 5
  languages: [],           // step 6  <-- NEW
  ui: {
    currentStep: 1,
  },
};

const resumeFormSlice = createSlice({
  name: 'resumeForm',
  initialState,
  reducers: {
    // STEP 1
    setPersonalInfo(state, action) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    // STEP 2
    setWorkExperience(state, action) {
      state.workExperience = action.payload; // array
    },
    addWorkExperienceItem(state, action) {
      state.workExperience.push(action.payload);
    },
    removeWorkExperienceItem(state, action) {
      state.workExperience = state.workExperience.filter(
        (item) => item.id !== action.payload
      );
    },

    // STEP 3
    setEducation(state, action) {
      state.education = action.payload; // array
    },
    addEducationItem(state, action) {
      state.education.push(action.payload);
    },
    updateEducationItem(state, action) {
      const { id, changes } = action.payload;
      const idx = state.education.findIndex((e) => e.id === id);
      if (idx !== -1) {
        state.education[idx] = { ...state.education[idx], ...changes };
      }
    },
    removeEducationItem(state, action) {
      state.education = state.education.filter((e) => e.id !== action.payload);
    },

    // STEP 4
    setCertifications(state, action) {
      state.certifications = action.payload; // array
    },
    addCertificationItem(state, action) {
      state.certifications.push(action.payload);
    },
    updateCertificationItem(state, action) {
      const { id, changes } = action.payload;
      const idx = state.certifications.findIndex((c) => c.id === id);
      if (idx !== -1) {
        state.certifications[idx] = { ...state.certifications[idx], ...changes };
      }
    },
    removeCertificationItem(state, action) {
      state.certifications = state.certifications.filter(
        (c) => c.id !== action.payload
      );
    },

    // STEP 5
    setProjects(state, action) {
      state.projects = action.payload;
    },
    addProjectItem(state, action) {
      state.projects.push(action.payload);
    },
    updateProjectItem(state, action) {
      const { id, changes } = action.payload;
      const idx = state.projects.findIndex((p) => p.id === id);
      if (idx !== -1) {
        state.projects[idx] = { ...state.projects[idx], ...changes };
      }
    },
    removeProjectItem(state, action) {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },

    // STEP 6
    setLanguages(state, action) {
      state.languages = action.payload;
    },
    addLanguageItem(state, action) {
      state.languages.push(action.payload);
    },
    updateLanguageItem(state, action) {
      const { id, changes } = action.payload;
      const idx = state.languages.findIndex((l) => l.id === id);
      if (idx !== -1) {
        state.languages[idx] = { ...state.languages[idx], ...changes };
      }
    },
    removeLanguageItem(state, action) {
      state.languages = state.languages.filter((l) => l.id !== action.payload);
    },

    // NAV / COMMON
    setCurrentStep(state, action) {
      state.ui.currentStep = action.payload;
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPersonalInfo,
  setWorkExperience,
  addWorkExperienceItem,
  removeWorkExperienceItem,

  setEducation,
  addEducationItem,
  updateEducationItem,
  removeEducationItem,

  setCertifications,
  addCertificationItem,
  updateCertificationItem,
  removeCertificationItem,

  setProjects,
  addProjectItem,
  updateProjectItem,
  removeProjectItem,

  setLanguages,
  addLanguageItem,
  updateLanguageItem,
  removeLanguageItem,

  setCurrentStep,
  resetForm,
} = resumeFormSlice.actions;

export default resumeFormSlice.reducer;
