import React from 'react';
import styles from './StepNavigation.module.css';
import clsx from 'clsx';

const StepNavigation = ({ showBack, onBack, onNext, nextLabel = 'Next', isNextDisabled, isSubmitting }) => {
  return (
    <div className={styles.buttonGroup}>
      {showBack ? (
        <button className={styles.btnSecondary} type="button" onClick={onBack}>
          Back
        </button>
      ) : <div />}

      <button
        className={clsx(styles.btnPrimary)}
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
      >
        {isSubmitting ? 'Please wait...' : nextLabel}
      </button>
    </div>
  );
};

export default StepNavigation;
