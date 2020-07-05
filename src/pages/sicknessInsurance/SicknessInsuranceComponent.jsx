import PropTypes from 'prop-types';
import React from 'react';
import { Layout } from '../../components/Layout';
import { InsurancePage } from '../../components/InsurancePage';
import { validateSicknessInsurance } from '../../resources/sicknessInsurance';

const SicknessInsuranceComponent = ({
  addSicknessInsurance,
  addSicknessInsuranceIsPending,
  deleteSicknessInsurance,
  deleteSicknessInsuranceIsPending,
  editSicknessInsurance,
  editSicknessInsuranceIsPending,
  getSicknessInsurances,
  getSicknessInsurancesIsPending,
  sicknessInsurances,
}) => (
  <Layout>
    <InsurancePage
      addTitle="Přidat nemocenské pojištění"
      addInsurance={addSicknessInsurance}
      addInsuranceIsPending={addSicknessInsuranceIsPending}
      deleteInsurance={deleteSicknessInsurance}
      deleteInsuranceIsPending={deleteSicknessInsuranceIsPending}
      editInsurance={editSicknessInsurance}
      editInsuranceIsPending={editSicknessInsuranceIsPending}
      editTitle="Upravit nemocenské pojištění"
      getInsurances={getSicknessInsurances}
      getInsurancesIsPending={getSicknessInsurancesIsPending}
      insurances={sicknessInsurances}
      title="Nemocenské pojištění"
      validateInsurance={validateSicknessInsurance}
    />
  </Layout>
);

SicknessInsuranceComponent.defaultProps = {
  sicknessInsurances: null,
};

SicknessInsuranceComponent.propTypes = {
  addSicknessInsurance: PropTypes.func.isRequired,
  addSicknessInsuranceIsPending: PropTypes.bool.isRequired,
  deleteSicknessInsurance: PropTypes.func.isRequired,
  deleteSicknessInsuranceIsPending: PropTypes.bool.isRequired,
  editSicknessInsurance: PropTypes.func.isRequired,
  editSicknessInsuranceIsPending: PropTypes.bool.isRequired,
  getSicknessInsurances: PropTypes.func.isRequired,
  getSicknessInsurancesIsPending: PropTypes.bool.isRequired,
  sicknessInsurances: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SicknessInsuranceComponent;

