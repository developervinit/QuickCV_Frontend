import React from 'react';
import Select from 'react-select';
import styles from './FormSelect.module.css';

const FormSelect = ({ label, error, ...props }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <Select classNamePrefix="react-select" {...props} />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default FormSelect;
