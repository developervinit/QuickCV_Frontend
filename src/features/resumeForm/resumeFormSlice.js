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
    profileImageDataUrl: null // base64 data URL (preview + persisted), null if none
  },
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
    setCurrentStep(state, action) {
      state.ui.currentStep = action.payload;
    },
    resetForm(state) {
      Object.assign(state, initialState);
    }
  }
});

export const { setPersonalInfo, setCurrentStep, resetForm } = resumeFormSlice.actions;
export default resumeFormSlice.reducer;
