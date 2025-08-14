import { useSelector, useDispatch } from 'react-redux';
import { setCurrentStep } from '../../../../features/resumeForm/resumeFormSlice';
import styles from './StepIndicator.module.css';


const StepIndicator = () => {

    const dispatch = useDispatch();
    const currentStep = useSelector((state) => state.resumeForm.ui.currentStep);

    function stepNavigatorFunction(stepNumber){
        dispatch(setCurrentStep(stepNumber));
      }

    return (<ul className={styles.ul}>
      <li className={currentStep === 1 ? styles.active : styles.li} onClick={() => stepNavigatorFunction(1)}>step1</li>
      <li className={currentStep === 2 ? styles.active : styles.li} onClick={() => stepNavigatorFunction(2)}>step2</li>
      <li className={currentStep === 3 ? styles.active : styles.li} onClick={() => stepNavigatorFunction(3)}>step3</li>
      <li className={currentStep === 4 ? styles.active : styles.li} onClick={() => stepNavigatorFunction(4)}>step4</li>
      <li className={currentStep === 5 ? styles.active : styles.li} onClick={() => stepNavigatorFunction(5)}>step5</li>
      <li className={currentStep === 6 ? styles.active : styles.li} onClick={() => stepNavigatorFunction(6)}>step6</li>
    </ul>)

}

export default StepIndicator;