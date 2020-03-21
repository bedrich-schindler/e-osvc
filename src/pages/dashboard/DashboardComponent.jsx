import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import styles from './styles.scss';

const DashboardComponent = ({ t }) => (
  <div>
    <h1 className={styles.title}>
      {t('general:title')}
    </h1>
  </div>
);

DashboardComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(DashboardComponent);
