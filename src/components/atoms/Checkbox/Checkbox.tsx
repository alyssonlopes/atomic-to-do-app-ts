import React from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <input type="checkbox" className={styles.checkbox} {...props} />;
};

export default Checkbox;
