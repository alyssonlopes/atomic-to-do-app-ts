import React from 'react';
import styles from './MainTemplate.module.css';

type MainTemplateProps = {
  children: React.ReactNode;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainTemplate;
