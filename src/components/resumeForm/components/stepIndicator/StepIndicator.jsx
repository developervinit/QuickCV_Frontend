import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from '../../../../features/resumeForm/resumeFormSlice';
import styles from './StepIndicator.module.css';


const StepIndicator = () => {

    const dispatch = useDispatch();
    const currentStep = useSelector((state) => state.resumeForm.ui.currentStep);

    function stepNavigatorFunction(stepNumber){
        dispatch(setCurrentStep(stepNumber));
      }

    return (<ul>
      <li className={currentStep === 1 ? styles.active : ""} onClick={() => stepNavigatorFunction(1)}>step-1</li>
      <li className={currentStep === 2 ? styles.active : ""} onClick={() => stepNavigatorFunction(2)}>step-2</li>
      <li className={currentStep === 3 ? styles.active : ""} onClick={() => stepNavigatorFunction(3)}>step-3</li>
      <li className={currentStep === 4 ? styles.active : ""} onClick={() => stepNavigatorFunction(4)}>step-4</li>
      <li className={currentStep === 5 ? styles.active : ""} onClick={() => stepNavigatorFunction(5)}>step-5</li>
      <li className={currentStep === 6 ? styles.active : ""} onClick={() => stepNavigatorFunction(6)}>step-6</li>
    </ul>)

}

export default StepIndicator;