import React from 'react';
import styles from './FormTextArea.module.css';
import clsx from 'clsx';

const FormTextArea = ({ label, error, ...props }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={clsx(styles.textarea, error && styles.textareaError)} {...props} />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default FormTextArea;
