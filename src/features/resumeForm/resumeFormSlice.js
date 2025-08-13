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

    // STEP 3 (new)
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
  setCurrentStep,
  resetForm,
} = resumeFormSlice.actions;

export default resumeFormSlice.reducer;
