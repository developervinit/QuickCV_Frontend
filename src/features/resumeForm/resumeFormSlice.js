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
    profileImageDataUrl: null
  },
  workExperience: [], // <- new
  ui: {
    currentStep: 1
  }
};

const resumeFormSlice = createSlice({
  name: 'resumeForm',
  initialState,
  reducers: {
    setPersonalInfo(state, action) {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setWorkExperience(state, action) {
      // action.payload should be an array
      state.workExperience = action.payload;
    },
    addWorkExperienceItem(state, action) {
      state.workExperience.push(action.payload);
    },
    removeWorkExperienceItem(state, action) {
      // action.payload = id
      state.workExperience = state.workExperience.filter((item) => item.id !== action.payload);
    },
    setCurrentStep(state, action) {
      state.ui.currentStep = action.payload;
    },
    resetForm(state) {
      Object.assign(state, initialState);
    }
  }
});

export const {
  setPersonalInfo,
  setWorkExperience,
  addWorkExperienceItem,
  removeWorkExperienceItem,
  setCurrentStep,
  resetForm
} = resumeFormSlice.actions;

export default resumeFormSlice.reducer;
