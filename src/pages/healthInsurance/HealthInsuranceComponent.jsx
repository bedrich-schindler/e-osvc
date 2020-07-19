import PropTypes from 'prop-types';
import React from 'react';
import { InsurancePage } from '../../components/InsurancePage';
import { validateHealthInsurance } from '../../resources/healthInsurance';

const HealthInsuranceComponent = ({
  addHealthInsurance,
  addHealthInsuranceIsPending,
  deleteHealthInsurance,
  deleteHealthInsuranceIsPending,
  editHealthInsurance,
  editHealthInsuranceIsPending,
  getHealthInsurances,
  getHealthInsurancesIsPending,
  healthInsurances,
  isOnline,
}) => (
  <InsurancePage
    addTitle="Přidat zdravotní pojištění"
    addInsurance={addHealthInsurance}
    addInsuranceIsPending={addHealthInsuranceIsPending}
    deleteInsurance={deleteHealthInsurance}
    deleteInsuranceIsPending={deleteHealthInsuranceIsPending}
    editInsurance={editHealthInsurance}
    editInsuranceIsPending={editHealthInsuranceIsPending}
    editTitle="Upravit zdravotní pojištění"
    getInsurances={getHealthInsurances}
    getInsurancesIsPending={getHealthInsurancesIsPending}
    insurances={healthInsurances}
    isOnline={isOnline}
    title="Zdravotní pojištění"
    validateInsurance={validateHealthInsurance}
  />
);

HealthInsuranceComponent.defaultProps = {
  healthInsurances: null,
};

HealthInsuranceComponent.propTypes = {
  addHealthInsurance: PropTypes.func.isRequired,
  addHealthInsuranceIsPending: PropTypes.bool.isRequired,
  deleteHealthInsurance: PropTypes.func.isRequired,
  deleteHealthInsuranceIsPending: PropTypes.bool.isRequired,
  editHealthInsurance: PropTypes.func.isRequired,
  editHealthInsuranceIsPending: PropTypes.bool.isRequired,
  getHealthInsurances: PropTypes.func.isRequired,
  getHealthInsurancesIsPending: PropTypes.bool.isRequired,
  healthInsurances: PropTypes.arrayOf(PropTypes.shape({})),
  isOnline: PropTypes.bool.isRequired,
};

export default HealthInsuranceComponent;

