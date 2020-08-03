import React from 'react';
import styles from './styles.scss';

const NotFoundComponent = () => (
  <div className={styles.root}>
    <h2 className={styles.title}>
      Stránka nebyla nalezena.
    </h2>
    <p className={styles.message}>
      Stránka se zadanou URL nebyla nalezena.
    </p>
  </div>
);

export default NotFoundComponent;
