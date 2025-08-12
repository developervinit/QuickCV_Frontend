import React from 'react';
import styles from './FormInput.module.css';
import clsx from 'clsx';

const FormInput = ({ label, error, ...inputProps }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={clsx(styles.input, error && styles.inputError)} {...inputProps} />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default FormInput;
