import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import resumeFormReducer from '../features/resumeForm/resumeFormSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  resumeForm: resumeFormReducer
});

export default rootReducer;
