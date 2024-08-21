import React from 'react';
import styles from './MainTemplate.module.css';

type MainTemplateProps = {
  children: React.ReactNode;
};

const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <main className={styles.container} data-testid="main-template-container">
      {children}
    </main>
  );
};

export default MainTemplate;
